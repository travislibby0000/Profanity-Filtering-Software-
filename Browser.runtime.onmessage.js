browser.runtime.onMessage.addListener(
  function(req, sender, callback) {
    if (req) {
      if (req.message) {
         if (req.message == "installed") {
           console.log('Checking is extension is installed!');
           callback(true);
         }
         else if(req.message = "getClipboardData") {
           console.log('Get clipboard data');
           callback(getDataFromClipboard());
