export default class WebAudioSites {
  static combineSites(sites: { [site: string]: AudioRule[] } = {}): { [site: string]: AudioRule[] } {
    return Object.assign({}, WebAudioSites.sites, sites);
  }

  static sites: { [site: string]: AudioRule[] } = {
    'abc.com': [{ className: 'akamai-caption-text', mode: 'element', tagName: 'DIV' }],
    'acorn.tv': [
      {
        iframe: true,
        mode: 'elementChild',
        parentSelector: 'div.vjs-text-track-display',
        simpleUnmute: true,
        subtitleSelector: ':scope div > div',
        tagName: 'DIV',
      }
    ],
    'www.amazon.com': [
      {
        displayHide: 'none',
        displaySelector: 'div.webPlayerContainer div.f35bt6a',
        displayShow: '',
        iframe: false,
        mode: 'watcher',
        parentSelector: 'div.webPlayerContainer div p > span',
        subtitleSelector: 'div.webPlayerContainer div span > span',
        videoSelector: 'div.webPlayerElement video[src]',
      }
    ],
    'www.amc.com': [
      { className: 'ttr-container', mode: 'element', subtitleSelector: 'span.ttr-cue', tagName: 'DIV' },
      { mode: 'cue', videoCueLanguage: 'en', videoSelector: 'video' },
    ],
    'tv.apple.com': [
      {
        displaySelector: 'div.video-container > div > div > div',
        mode: 'elementChild',
        parentSelector: 'div.video-container',
        preserveWhiteSpace: true,
        rootNode: true,
        subtitleSelector: 'div > div > div > div > div',
        tagName: 'DIV',
      }
    ],
   ', videoSelector: 'video#quickplayPlayer' }],
    'www.attwatchtv.com': [{ mode: 'cue', videoSelector: 'video#quickplayPlayer' }],
   
      { className: 'bmpui-ui-subtitle-label', mode: 'element', tagName: 'SPAN' },
      { className: 'bmpui-subtitle-region-container', mode: 'element', subtitleSelector: 'div.bmpui-container-wrapper > span.bmpui-ui-subtitle-label', tagName: 'div' },
    ],

 '', subtitleSelector: 'div.jw-text-track-cue', tagName: 'DIV' }],
    'www.cbs.com': [{ mode: 'cue', videoCueLanguage: 'en', videoCueRequireShowing: false }],
   : true, mode: 'elementChild', parentSelector: 'div.clpp-subtitles-container', simpleUnmute: true, tagName: '#text' }],
    'www.criterionchannel.com': [{ iframe: true, mode: 'cue', videoCueHideCues: true, videoCueRequireShowing: false }],
    'www.crunchyroll.com': [
      {
        apfCaptions: true,
        apfCaptionsSelector: 'vilosVttJs',
        displaySelector: 'canvas#velocity-canvas',
        externalSub: true,
        externalSubTrackMode: 'hidden',
        externalSubVar: 'window.v1config.media.subtitles',
        iframe: true,
        mode: 'cue',
        videoCueLanguage: 'enUS',
        videoCueRequireShowing: false,
      }
    ],
    'www.cwtv.com': [
      { className: 'ttr-container', mode: 'element', subtitleSelector: 'span.ttr-cue', tagName: 'DIV' },
      { className: 'ttr-line', mode: 'element', note: '[CC]', subtitleSelector: 'span.ttr-cue', tagName: 'DIV' },
    ],
    'www.discoveryplus.com': [{ displaySelector: 'div.cjRVXG', mode: 'cue', videoCueKind: 'captions', videoCueLanguage: 'en' }],
    'www.dishanywhere.com': [
      { className: 'bmpui-ui-subtitle-label', mode: 'element', tagName: 'SPAN' },
      { className: 'bmpui-subtitle-region-container', mode: 'element', subtitleSelector: 'div.bmpui-container-wrapper > span.bmpui-ui-subtitle-label', tagName: 'div' },
    ],
    'www.disneyplus.com': [{ mode: 'cue', videoCueHideCues: true, videoSelector: 'video.btm-media-client-element' }],
    'www.fox.com': [{ className: 'jw-text-track-container', mode: 'element', subtitleSelector: 'div.jw-text-track-cue', tagName: 'DIV' }],
    'www.funimation.com': [
      {
        iframe: true,
        mode: 'elementChild',
        parentSelector: 'div.vjs-text-track-display',
        simpleUnmute: true,
        subtitleSelector: ':scope div > div',
        tagName: 'DIV',
      }
    ],
    'www.paramountplus.com': [{ mode: 'cue', videoCueLanguage: 'en', videoCueRequireShowing: false }],
    'play.google.com': [{ className: 'lava-timed-text-window', mode: 'element', subtitleSelector: 'span.lava-timed-text-caption', tagName: 'DIV' }],
    'play.hbomax.com': [{ displayVisibility: true, dynamicTargetMode: 'watcher', dynamicTextKey: 'Example Text', mode: 'dynamic', parentSelectorAll: '> span', subtitleSelector: 'span' }],
    'www.hulu.com': [
      { className: 'caption-text-box', displaySelector: 'div.caption-text-box', mode: 'element', subtitleSelector: 'p', tagName: 'DIV' },
      { displaySelector: 'div.CaptionBox', mode: 'elementChild', parentSelector: 'div.CaptionBox', tagName: 'P' }
    ],
    'www.nbc.com': [
      { className: 'ttr-line', mode: 'element', subtitleSelector: 'span.ttr-cue', tagName: 'DIV' },
      { mode: 'cue', videoCueLanguage: 'en' },
    ],
    'www.netflix.com': [{ className: 'player-timedtext-text-container', mode: 'element', subtitleSelector: 'span', tagName: 'DIV' }],
    'www.pbs.org': [{ iframe: true, mode: 'element', subtitleSelector: 'div.vjs-text-track-cue > div', tagName: 'DIV' }],
    'www.peacocktv.com': [
      { displaySelector: 'div.video-player__subtitles', mode: 'elementChild', parentSelector: 'div.video-player__subtitles > div', simpleUnmute: true, tagName: '#text' },
      { displaySelector: 'div.video-player__subtitles', mode: 'elementChild', parentSelector: 'div.video-player__subtitles > div', subtitleSelector: 'SPAN > SPAN', tagName: 'DIV' },
      { displaySelector: 'div.video-player__subtitles', mode: 'elementChild', parentSelector: 'div.video-player__subtitles > div', tagName: 'SPAN' },
    ],
    'www.philo.com': [{ mode: 'cue' }],
    'app.plex.tv': [
      { dataPropPresent: 'dialogueId', mode: 'element', subtitleSelector: 'span > span', tagName: 'DIV' },
      { containsSelector: 'div[data-dialogue-id]', mode: 'element', subtitleSelector: 'span > span', tagName: 'DIV' },
    ],


elementChild
cue
mode

videoCueHideCues
videoCueRequireShowing
elementChild
parentSelector
div.rb-text-container
subtitleSelector
tagName
convertBreaks
displaySelector
div.vp-captions
ignoreMutations
div.contentWrapper
simpleUnmute


Starz
Hulu
Netflix 
AmazonPrimeVideo 
Youtube 


Closed Captioning 
starz-captions div.cue-list


YouTube
displaySelector
div.libassjs-canvas-parent
externalSub "true"
videoCueLanguage 'en-US'
videoCueRequireShowing "false"
