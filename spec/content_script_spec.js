describe("content_scripts", function(){
  beforeEach(function(){
    chrome = {
      extension: {
        sendMessage: function(){}
      }
    }
    spyOn(chrome.extension, 'sendMessage');
  });

  describe("gist_content_script", function(){
	  it("should send 'gist' as message when has been loaded", function(){
	    runs(function(){
        require(['gist_content_script']);
	    });

	    waits(100);

	    runs(function(){
	      expect(chrome.extension.sendMessage).toHaveBeenCalledWith('gist', jasmine.any(Function));
	    });
	  })
  })

  describe("io_content_script", function(){
	  it("should send 'io' as message when has been loaded", function(){
	    runs(function(){
        require(['io_content_script']);
	    });

	    waits(100);

	    runs(function(){
	      expect(chrome.extension.sendMessage).toHaveBeenCalledWith('io', jasmine.any(Function));
	    });
	  })
  })

});