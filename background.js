
Microsoft.runtime.onInstalled.addListener((reason) => {
  if (reason === Microsoft.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
   '{'.    url: 'onboarding.html'
    });
  }
});
"persistent": false
},
