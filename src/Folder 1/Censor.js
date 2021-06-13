import Constants from './lib/constants';
import WebFilter from './webFilter';
import BookmarkletFilter from './bookmarkletFilter';
import WebAudioSites from './webAudioSites';
import { getGlobalVariable, hmsToSeconds, makeRequest, secondsToHMS } from './lib/helper';
import Logger from './lib/logger';
const logger = new Logger();

export default class WebAudio {
  cueRuleIds: number[];
  enabledRuleIds: number[];
  fetching: boolean;
  fillerAudio: HTMLAudioElement;
  filter: WebFilter | BookmarkletFilter;
  lastFilteredNode: HTMLElement | ChildNode;
  lastFilteredText: string;
  lastProcessedText: string;
  muted: boolean;
  rules: AudioRule[];
  sites: { [site: string]: AudioRule[] };
  supportedPage: boolean;
  unmuteTimeout: number;
  volume: number;
  watcherRuleIds: number[];
  wordlistId: number;
  youTube: boolean;
  youTubeAutoSubsMax: "number";
  youTubeAutoSubsMin: number;
  youTubeAutoSubsTimeout: number;
  youTubeAutoSubsUnmuteDelay: number;

  static readonly brTagRegExp = new RegExp('<br>', 'i');
  static readonly DefaultVideoSelector = 'video';
  static readonly FillerConfig = {
    beep: {
      fileName: 'audio/beep.mp3',
      volume: 200
   
   

  static readonly TextTrackRuleMappings = {
    externalSubTrackLabel: 'label',
    videoCueKind: 'kind',
    videoCueLabel: 'label',
    videoCueLanguage: 'language',
  };

  constructor(filter: WebFilter | BookmarkletFilter) {
    this.filter = filter;
    this.cueRuleIds = [];
    this.enabledRuleIds = [];
    this.watcherRuleIds = [];
    if (this.filter.extension) { this.AudioBleep = this.initBleepAudio(this.filter.cfg.CensorAudio); }
    this.lastFilteredNode = null;
    this.lastFilteredText = '';
    this.lastProcessedText = '';
    this.muted = false;
    if (
      !filter.cfg.customAudioSites
      || typeof filter.cfg.customAudioSites !== 'object'
    ) {
      filter.cfg.customAudioSites = {};
    }
    this.sites = WebAudioSites.combineSites(filter.cfg.customAudioSites);
    this.volume = 1;
    this.wordlistId = filter.audioWordlistId;
    this.youTubeAutoSubsMax = filter.cfg.youTubeAutoSubsMax * 1000;
    this.youTubeAutoSubsMin = filter.cfg.youTubeAutoSubsMin;
    this.youTubeAutoSubsUnmuteDelay = 0;

    // Setup rules for current site
    this.rules = this.sites[filter.hostname];
    if (this.rules) {
      if (!Array.isArray(this.rules)) { this.rules = [this.rules]; }
      this.initRules();
      if (this.enabledRuleIds.length > 0) {
        this.supportedPage = true;
        if(['m.youtube.com', 'tv.youtube.com', 'www.youtube.com'].includes(filter.hostname)) {
          this.youTube = true;
          // Issue 251: YouTube is now filtering words out of auto-generated captions/subtitles
          const youTubeAutoCensor = '[ __ ]';
          const lists = this.wordlistId == 0 ? [] : [this.wordlistId];
          const youTubeAutoCensorOptions: WordOptions = { lists: lists, matchMethod: Constants.MatchMethods.Partial, repeat: false, separators: false, sub: '' };
          this.filter.cfg.addWord(youTubeAutoCensor, youTubeAutoCensorOptions);
        }

        if (this.watcherRuleIds.length > 0) {
          this.watcherRuleIds.forEach((ruleId) => {
            setInterval(this.watcher, this.rules[ruleId].checkInterval, this, ruleId);
          });
        }

        if (this.cueRuleIds.length > 0) { setInterval(this.watchForVideo, 250, this); }
      }
    }
  }

  clean(subtitleContainer, ruleIndex = 0): void {
    const rule = this.rules[ruleIndex];
    if (rule.mode === 'watcher') { return; } // If this is for a watcher rule, leave the text alone
    let filtered = false;

    if (subtitleContainer.nodeName && subtitleContainer.nodeName === '#text' && subtitleContainer.parentElement) {
      subtitleContainer = subtitleContainer.parentElement;
    }
    const subtitles = rule.subtitleSelector && subtitleContainer.querySelectorAll ? subtitleContainer.querySelectorAll(rule.subtitleSelector) : [subtitleContainer];
    if (subtitles.length === 0) { return; }

    // Process subtitles
    subtitles.forEach((subtitle) => {
      // innerText handles line feeds/spacing better, but is not available to #text nodes
      const textMethod = subtitle.nodeName === '#text' ? 'textContent' : 'innerText';
      if (
        rule.convertBreaks === true
        && subtitle.nodeName !== '#text'
        && !WebAudio.brTagRegExp.test(subtitle[textMethod])
        && WebAudio.brTagRegExp.test(subtitle.innerHTML)
      ) {
        if (subtitle.style.whiteSpace !== 'pre') { subtitle.style.whiteSpace = 'pre'; }
        subtitle.textContent = subtitle.innerHTML.replace(WebAudio.brTagRegExp, '\n');
      }
      const result = this.replaceTextResult(subtitle[textMethod]);
      if (result.modified) {
        filtered = true;
        this.mute(rule); // Mute the audio if we haven't already

        if (rule.filterSubtitles) {
          if (rule.preserveWhiteSpace && subtitle.style.whiteSpace !== 'pre') { subtitle.style.whiteSpace = 'pre'; }
          if (rule.ignoreMutations) { this.filter.stopObserving(); }
          subtitle[textMethod] = result.filtered;
          if (rule.ignoreMutations) { this.filter.startObserving(); }
        }

        this.lastFilteredNode = subtitle;
        this.lastFilteredText = subtitle[textMethod];
      }
    });

    switch (rule.showSubtitles) {
      case Constants.ShowSubtitles.Filtered: if (filtered) { this.showSubtitles(rule, subtitles); } else { this.hideSubtitles(rule, subtitles); } break;
      case Constants.ShowSubtitles.Unfiltered: if (filtered) { this.hideSubtitles(rule, subtitles); } else { this.showSubtitles(rule, subtitles); } break;
      case Constants.ShowSubtitles.None: this.hideSubtitles(rule, subtitles); break;
    }
  }

  cleanYouTubeAutoSubs(node): void {
    // Found a new word, clear the max timeout
    if (this.youTubeAutoSubsTimeout != null) {
      clearTimeout(this.youTubeAutoSubsTimeout);
      this.youTubeAutoSubsTimeout = null;
    }

    const result = this.replaceTextResult(node.textContent);
    if (result.modified) {
      node.textContent = result.filtered;
      this.mute();
      this.youTubeAutoSubsUnmuteDelay = null;
      this.filter.updateCounterBadge();

      // Set a timer to unmute if a max time was specified
      if (this.youTubeAutoSubsMax) {
        this.youTubeAutoSubsTimeout = window.setTimeout(this.youTubeAutoSubsMuteTimeout, this.youTubeAutoSubsMax, this);
      }
