const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message === 'get-user-data') {
    sendResponse(user);
  }
});

chrome.runtime.sendMessage('get-user-data', (response) => {
  
  console.log('received user data', response);
  initializeUI(response);
});



const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message === 'get-user-data') {
    sendResponse(user);
  }
}); chrome.runtime.sendMessage('get-user-data', (response) => {
  
  console.log('received user data', response);
  initializeUI(response);
});



const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message === 'get-user-data') {
    sendResponse(user);
  }
});
