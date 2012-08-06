describe("background", function(){
  beforeEach(function(){
    chrome = {
      extension: {
        onMessage: {
          addListener: function(){}
        }
      }
    } 
    spyOn(chrome.extension.onMessage, 'addListener');
    spyOn(GistIO, 'setUp').andCallFake(function(){});
  });

  it("should add a listener to setup GistIO when got a message from content scripts", function(){
    runs(function(){
      require(['background']);
    });
    waits(100);

    runs(function(){
      listener = chrome.extension.onMessage.addListener.mostRecentCall.args[0]
      listener("message", {tab: "tab"}, function(){});
      expect(GistIO.setUp).toHaveBeenCalledWith("message", "tab");
    });
  });

})
