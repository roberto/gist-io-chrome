describe("GistIO", function(){

  describe("setUp", function(){
    beforeEach(function(){
      tab = {id: 12345};
      page = GistIO.pages["gist"];
      chrome = {
        pageAction: {
          show: function(){},
          onClicked: {
            addListener: function(){}
          }
        }
      } 

      spyOn(chrome.pageAction, 'show');
      spyOn(chrome.pageAction.onClicked, 'addListener');
      spyOn(GistIO, 'alternate');

      GistIO.setUp("gist", tab);
    });

    it("should show button", function(){
      expect(chrome.pageAction.show).toHaveBeenCalledWith(tab.id);
    });

    it("should add a listener for clicked event", function(){
      expect(chrome.pageAction.onClicked.addListener).toHaveBeenCalled();
    });

    it("should setup a listener to call alternate method", function(){
      listener = chrome.pageAction.onClicked.addListener.mostRecentCall.args[0]
      listener({id: 12345});
      expect(GistIO.alternate).toHaveBeenCalledWith(page, tab);
    });

  });

  describe("alternate", function(){
    beforeEach(function(){
      chrome = {
        tabs: {
          update: function(){}
        }
      }
      spyOn(chrome.tabs, 'update');
    });

    it("should redirect to gist when current page is a valid gistIO page", function(){
      tab = {id: 12345, url: "http://gist.io/54321"};
      page = GistIO.pages["io"];

      GistIO.alternate(page, tab);
      expect(chrome.tabs.update).toHaveBeenCalledWith(tab.id, {url: "https://gist.github.com/54321"});
    });

    it("should redirect to gistIO when current page is a valid gist page", function(){
      tab = {id: 12345, url: "http://gist.github.com/dude/101010"};
      page = GistIO.pages["gist"];

      GistIO.alternate(page, tab);
      expect(chrome.tabs.update).toHaveBeenCalledWith(tab.id, {url: "http://gist.io/101010"});
    });

    it("should not redirect to gist when current page is a invalid gistIO page", function(){
      tab = {id: 12345, url: "http://gist.io/"};
      page = GistIO.pages["io"];

      GistIO.alternate(page, tab);
      expect(chrome.tabs.update).wasNotCalled();
    });

    it("should not redirect to gistIO when current page is a invalid gist page", function(){
      tab = {id: 12345, url: "https://gist.github.com/gists/101010/edit"};
      page = GistIO.pages["gist"];

      GistIO.alternate(page, tab);
      expect(chrome.tabs.update).wasNotCalled();
    });
  });

});

