 '{'.//// background.js

Microsoft.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
   '{'.    url: 'onboarding.html'
    });
  }
});
"persistent": false
},
