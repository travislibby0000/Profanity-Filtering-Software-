{ 
    @@ -0,0 +1,392 @@
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var profanityfiltering_1 = require("./profanityfiltering");
var Profanityfilteringworker = /** @class */ (function () {
    function profanityfilteringworker(dirtyWords, hideCaptions, hideCaptionsWhenFiltered, showCaptionsWhenFiltered, pollInterval, muteDelay) {
        var _this = this;
        this.isMuted = false;
        this.mutedCounter = 0;
        this.dirtyWords = StreamCleanWorker.NormalizeDirtyWords(dirtyWords || filter_1.Filter.DefaultFilterWords);
       
        
        this.pollInterval = pollInterval;
        this.showCaptionsWhenFiltered = showCaptionsWhenFiltered;
        this.filter = new filter_1.Filter(this.dirtyWords);
        this.selectors = {
            Amazon: { selector: ".f1iwgj00" },
            AmazonCA: { selector: ".persistentPanel" },
            AmazonCoUk: { selector: ".persistentPanel" },
            AmazonPrimeVideo: { selector: ".fg8afi5" },
            Hbo: { selector: ",fg8afi5" },
            FrndlyTV: { selector: ".jw-captions" },
           Hulu: { selector: ".CaptionBox" },
            ID: { selector: ".vjs-text-track-display" },
         
    

            ID: { selector: ".vjs-text-track-display" },
            IMDB: { selector: ".captions" },
            NBC: { selector: "anv-caption-608-frame-line-char" },
            NetFlix: { selector: ".player-timedtext" },
            NineNow: { selector: ".vjs-text-track-display" },
            OWN: { selector: "anv-caption-608-frame-line-char" },
            ParamountPlus: { selector: ".skin-tt-container-tt-div" },
            Peacock: { selector: ".video-player__subtitles" },
            Plex: { selector: ".libjass-subs" },
            ReelzNow: { selector: ".vjs-text-track-display" },
            Roku: { selector: ".vjs-text-track-display" },
            Showmax: { selector: ".contentWrapper" },
            Sling: { selector: ".bmpui-ui-subtitle-label" },
            Stan: { selector: ".clpp-subtitles" },
            TLC: { selector: ".vjs-text-track-display" },
            TubiTV: { selector: "#captionsComponent" },
            Viki: { selector: ".vjs-text-track-display" },
            Vudu: { selector: ".subtitles", IframeId: "contentPlayerFrame" },
            YouTube: { selector: ".captions-text" }
        };
        this.hideSelectorElement = document.createElement("style");
        this.hideSelectorString = "";
        this.hideSelectors = [];
        for (var prop in this.selectors) {
            if (!this.selectors.hasOwnProperty(prop)) {
                continue;
            }
            this.hideSelectors.push(this.selectors[prop].selector);
        }
        this.hideSelectors.push("video::cue");
        this.hideSelectorString = this.hideSelectors.join(",") + "{ display: none; opacity: 0 !important; }";
        var getCaptionSelector = function () {
            if (streamClean_1.StreamClean.IsAmazon)
                return _this.selectors.Amazon;
            if (streamClean_1.StreamClean.IsAmazonCA)
                return _this.selectors.AmazonCA;
            if (streamClean_1.StreamClean.IsAmazonCoUk)
                return _this.selectors.AmazonCoUk;
            if (streamClean_1.StreamClean.IsAmazonPrimeVideo)
                return _this.selectors.AmazonPrimeVideo;
            if (streamClean_1.StreamClean.IsAppleTv)
                return _this.selectors.AppleTv;
            if (streamClean_1.StreamClean.IsCharterSpectrum)
                return _this.selectors.CharterSpectrum;
            if (streamClean_1.StreamClean.IsCrackle)
                return _this.selectors.Crackle;
            if (streamClean_1.StreamClean.IsDiscoveryLife)
                return _this.selectors.DiscoveryLife;
            if (streamClean_1.StreamClean.IsDishAnywhere)
                return _this.selectors.DishAnywhere;
            if (streamClean_1.StreamClean.IsEpix)
                return _this.selectors.Epix;
            if (streamClean_1.StreamClean.IsFrndlyTV)
                return _this.selectors.FrndlyTV;
            if (streamClean_1.StreamClean.IsFuboTV)
                return _this.selectors.FuboTV;
            if (streamClean_1.StreamClean.IsHallmarkMoviesNow)
                return _this.selectors.HallmarkMoviesNow;
            if (streamClean_1.StreamClean.IsHulu)
                return _this.selectors.Hulu;
            if (streamClean_1.StreamClean.IsID)
                return _this.selectors.ID;
            if (streamClean_1.StreamClean.IsIMDB)
                return _this.selectors.IMDB;
            if (streamClean_1.StreamClean.IsNBC)
                return _this.selectors.NBC;
            if (streamClean_1.StreamClean.IsNetFlix)
                return _this.selectors.NetFlix;
            if (streamClean_1.StreamClean.IsNineNow)
                return _this.selectors.NineNow;
            if (streamClean_1.StreamClean.IsOWN)
                return _this.selectors.OWN;
            if (streamClean_1.StreamClean.IsParamountPlus)
                return _this.selectors.ParamountPlus;
            if (streamClean_1.StreamClean.IsPeacock)
                return _this.selectors.Peacock;
            if (streamClean_1.StreamClean.IsPlex)
                return _this.selectors.Plex;
            if (streamClean_1.StreamClean.IsReelzNow)
                return _this.selectors.ReelzNow;
            if (streamClean_1.StreamClean.IsRoku)
                return _this.selectors.Roku;
            if (streamClean_1.StreamClean.IsShowmax)
                return _this.selectors.Showmax;
            if (streamClean_1.StreamClean.IsSling)
                return _this.selectors.Sling;
            if (streamClean_1.StreamClean.IsStan)
                return _this.selectors.Stan;
            if (streamClean_1.StreamClean.IsTLC)
                return _this.selectors.TLC;
            if (streamClean_1.StreamClean.IsTubiTV)
                return _this.selectors.TubiTV;
            if (streamClean_1.StreamClean.IsViki)
                return _this.selectors.Viki;
            if (streamClean_1.StreamClean.IsVudu)
                return _this.selectors.Vudu;
            if (streamClean_1.StreamClean.IsYouTube)
                return _this.selectors.YouTube;
            return "";
        };
        this.captionsSelector = getCaptionSelector();
        this.muteTab = function () {
            // Hide captions when a filtered word is found
            if (_this.hideCaptionsWhenFiltered && !_this.showCaptionsWhenFiltered) {
                _this.hideSelectorElement.innerHTML = _this.hideSelectorString;
            }
            // Show captions when a filtered word is found
            if (_this.showCaptionsWhenFiltered) {
                _this.hideSelectorElement.innerHTML = "";
            }
            if (!_this.isMuted) {
                _this.mutedCounter++;
                StreamCleanWorker.Log(_this.mutedCounter.toString());
                chrome.runtime.sendMessage({ counter: _this.mutedCounter });
            }
            _this.isMuted = true;
            chrome.runtime.sendMessage({ muteUpdate: true, muted: true });
        };
        this.unMuteTab = function () {
            // Only hide captions when a filtered word is found
            if (_this.hideCaptionsWhenFiltered) {
                _this.hideSelectorElement.innerHTML = "";
            }
            // Always hide captions
            if (_this.hideCaptions) {
                _this.hideSelectorElement.innerHTML = _this.hideSelectorString;
            }
            _this.isMuted = false;
            var unMute = function () {
                if (!_this.isMuted) {
                    chrome.runtime.sendMessage({ muteUpdate: true, muted: false });
                }
            };
            if (muteDelay > 0) {
                setTimeout(unMute, muteDelay);
            }
            else {
                unMute();
            }
        };
    }
    StreamCleanWorker.prototype.StartFiltering = function () {
        var _this = this;
        StreamCleanWorker.IsFiltering = true;
        StreamCleanWorker.Log("Stream Clean is Filtering...");
        if (streamClean_1.StreamClean.IsHboMax) {
            this.FilterHboMax();
            return;
        }
        var filterByCues = streamClean_1.StreamClean.IsAttTv ||
            streamClean_1.StreamClean.IsDisneyPlus ||
            streamClean_1.StreamClean.IsFreeForm ||
            streamClean_1.StreamClean.IsHallmark ||
            streamClean_1.StreamClean.IsPhilo ||
            streamClean_1.StreamClean.IsPlaystationVue ||
            streamClean_1.StreamClean.IsPlutoTv ||
            streamClean_1.StreamClean.IsScienceChannel ||
            streamClean_1.StreamClean.IsWeatherChannel;
        // Append the style node so it's ready to use if captions are being hidden
        document.body.appendChild(this.hideSelectorElement);
        if (this.hideCaptions) {
            this.hideSelectorElement.innerHTML = this.hideSelectorString;
        }
        var filterAction = streamClean_1.StreamClean.IsOWN || streamClean_1.StreamClean.IsNBC
            ? this.FilterAnvato
            : filterByCues
                ? this.FilterByCues
                : this.FilterByNode;
        this.filterInterval = setInterval(function () { return filterAction.call(_this); }, this.pollInterval);
    };
    StreamCleanWorker.prototype.StopFiltering = function () {
        clearInterval(this.filterInterval);
    };
    StreamCleanWorker.prototype.FilterHboMax = function () {
        var _this = this;
        StreamCleanWorker.Log("Filtering for HBO Max...");
        var filteredNodes = [];
        var isFiltering = false;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                Array.from(mutation.addedNodes).forEach(function (node) {
                    if (node.tagName !== "SPAN") {
                        return;
                    }
                    var cleanCaption = _this.filter.Clean(node.textContent || "");
                    if (cleanCaption.indexOf(filter_1.Filter.Mask) > -1) {
                        node.textContent = cleanCaption;
                        filteredNodes.push(node);
                        _this.muteTab();
                    }
                });
                // Removing any previously filtered nodes 
                Array.from(mutation.removedNodes).forEach(function (node) {
                    var itemIndex = filteredNodes.indexOf(node);
                    if (itemIndex > -1) {
                        filteredNodes.splice(itemIndex, 1);
                    }
                });
                // Check all filtered nodes and mute or unmute
                if (filteredNodes.map(function (i) { return i.textContent; }).some(function (c) { return c.indexOf(filter_1.Filter.Mask) > -1; })) {
                    _this.muteTab();
                }
                else {
                    _this.unMuteTab();
                }
            });
        });
        var tryToFilter = function () {
            if (isFiltering) {
                return;
            }
            //const elements = document.querySelectorAll(this.captionsSelector.selector);
            var elements = [document];
            if (!elements.length) {
                setTimeout(tryToFilter, 2000);
                return;
            }
            isFiltering = true;
            Array.from(elements).forEach(function (ele) {
                observer.observe(ele, { characterData: true, characterDataOldValue: true, childList: true, subtree: true });
            });
        };
        tryToFilter();
    };
    StreamCleanWorker.prototype.FilterByNode = function () {
        if (!this.captionsSelector) {
            StreamCleanWorker.Log("Missing caption selector...");
            return;
        }
        var iframe = this.captionsSelector.IframeId ? document.getElementById(this.captionsSelector.IframeId) : null;
        if (this.captionsSelector.IframeId && !iframe) {
            return;
        }
        var doc = this.captionsSelector.domSelector
            ? this.captionsSelector.domSelector()
            : this.captionsSelector.IframeId
                ? iframe.contentDocument
                : document;
        var ele = doc.querySelector(this.captionsSelector.selector);
        if (!ele) {
            this.unMuteTab();
            return;
        }
        var filterResults = [];
        var walker = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
            var caption = walker.currentNode.nodeValue;
            var result = this.filter.Clean(caption);
            filterResults.push(result);
            walker.currentNode.nodeValue = result;
        }
        if (filterResults.some(function (result) { return result.indexOf(filter_1.Filter.Mask) > -1; })) {
            this.muteTab();
        }
        else {
            this.unMuteTab();
        }
    };
    StreamCleanWorker.prototype.FilterByCues = function () {
        var filterResults = [];
        var video = document.querySelector("video");
        var textTracks = video ? video.textTracks : null;
        if (!textTracks || !textTracks.length) {
            this.unMuteTab();
            return;
        }
        var tracks = textTracks.length > 1 && textTracks[1].kind === "captions"
            ? textTracks[1]
            : textTracks[0];
        var cues = tracks.activeCues;
        if (!cues || !cues.length) {
            this.unMuteTab();
            return;
        }
        for (var key in cues) {
            var text = cues[key].text;
            if (!text) {
                return;
            }
            var result = this.filter.Clean(text);
            filterResults.push(result);
            if (filterResults.some(function (result) { return result.indexOf(filter_1.Filter.Mask) > -1; })) {
                this.muteTab();
                text = result;
                cues[key].text = result;
                tracks.addCue(cues[key]);
            }
            else {
                this.unMuteTab();
            }
        }
    };
    StreamCleanWorker.prototype.FilterAnvato = function () {
        var iframe = document.getElementById("anvatoplayer0") || // OWN
            document.getElementById("nbctveappplayer"); // NBC
        if (!iframe) {
            return;
        }
        var doc = iframe.contentDocument;
        if (!document) {
            return;
        }
        // OWN breaks up the captions by characters, so they must be built up each time
        var elements = doc.getElementsByClassName(this.captionsSelector);
        var result = [];
        var i;
        for (i = 0; i < elements.length; i++) {
            result.push((elements[i].innerHTML || "").replace("&nbsp;", " "));
            if (this.hideCaptions) {
                elements[i].style.display = "none";
            }
        }
        var caption = result.join("").replace(/\s+/g, " ").trim();
        var filteredCaption = this.filter.Clean(caption);
        if ([filteredCaption].some(function (result) { return result.indexOf(filter_1.Filter.Mask) > -1; })) {
            this.muteTab();
            // For OWN, the captions will always be hidden
            for (i = 0; i < elements.length; i++) {
                elements[i].style.display = "none !important";
            }
        }
        else {
            this.unMuteTab();
            if (!this.hideCaptions) {
                for (i = 0; i < elements.length; i++) {
                    elements[i].style.display = "inline !important";
                }
            }
        }
    };
    StreamCleanWorker.Log = function (message) {
        console.log("%c " + message, 'background: #222; color: #bada55');
    };
    StreamCleanWorker.NormalizeDirtyWords = function (dirtyWords) {
        // Sort the list descending by character length so phrases get filtered first
        dirtyWords.sort(function (a, b) { return b.length - a.length; });
        var results = [];
        for (var i = 0; i < dirtyWords.length; i++) {
            results.push(filter_1.Filter.NormalizeWord(dirtyWords[i]));
        }
        return results;
    };
    StreamCleanWorker.IsFiltering = false;
    StreamCleanWorker.LastFilterWordsSettings = "";
    return StreamCleanWorker;
}());
exports.StreamCleanWorker = StreamCleanWorker;
}
