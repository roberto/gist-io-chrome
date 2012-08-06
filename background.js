chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
  GistIO.setUp(message, sender.tab);
  sendResponse({});
});
