function GistIO(){};

GistIO.pages = {
  gist: {
    regex: /^http[s]?\:\/\/gist\.github\.com\/(\d+)$/,
    destiny: "http://gist.io/" 
  },
  io: {
    regex: /^http\:\/\/gist\.io\/(\d+)$/,
    destiny: "https://gist.github.com/" 
  }
};

GistIO.setUp = function(pageId, tab){
  chrome.pageAction.show(tab.id);
  chrome.pageAction.onClicked.addListener(function(tab){
    GistIO.alternate(GistIO.pages[pageId],tab);
  });
}

GistIO.alternate = function(page, tab) {
  if (tab.url.match(page.regex)){
    chrome.tabs.update(tab.id, {url: page.destiny + RegExp.$1}); 
  }
};
