chrome.runtime.onInstalled.addListener(function() {
  // ERROR! Events must be registered synchronously from the start of
  // the page.
  chrome.bookmarks.onCreated.addListener(function() {
    // do something
  });
});

chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});

chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message.data == "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data == "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js'});
  } else if (message.data == "changeColor") {
    chrome.scripting.executeScript(
        {code: 'document.body.style.backgroundColor="orange"'});
  };
});

chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == 'hello') {
    sendResponse({greeting: 'welcome!'})
  } else if (message == 'goodbye') {
    chrome.runtime.Port.disconnect();
  }
});
