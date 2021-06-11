function(clipboardData) {
        messagePageScript(clipboardData);
      }
    );
  }
});

// Send clipboard data to page script
function messagePageScript(clipboardData) {
  window.postMessage({
    direction: "from-content-script",
    message: clipboardData
  }, "*");
}
