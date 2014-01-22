/*
 * Asynchronous WPM Loader / Bootstrap
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */

/*
 * Constants (Override by creating window.WPM_CONSTANT_OVERRIDES)
 */
(function(){
	window.WPM = window.WPM || {};
	
	WPM.Constants = {
		ZEPTO_URL: "://code.jquery.com/jquery-2.0.3.min.js",
		PACKAGE_LOADER_URL: "scripts/package_loader.js",
		BOOTSTRAP_URL: "scripts/bootstrap.js"
	};
	
	if (window.WPM_CONSTANT_OVERRIDES)
		for (var a in window.WPM_CONSTANT_OVERRIDES) { WPM.Constants[a] = WPM_CONSTANT_OVERRIDES[a]; }
})();

(function(){
	var Log = {
		warn: function(o) { console.warn(o); },
		log: function(o) { console.log(o); },
		i: function(o) { console.info(o); }
	}
	
	var WPMBS = function() {
		var loadjq = false;
		if (!window.jQuery)
		{
			Log.i('-- jquery not present on page, loading --');
			loadjq = true;
		}
		
		if (loadjq)
		{
			var self = this;
			(function(){
				var tId = setInterval(function(){if(jQuery) onComplete()},11);
				function onComplete(){
					clearInterval(tId);
					jQuery.noConflict();
					self.$ = jQuery;
					self.onJQLoaded();
				};
			})();
		}
		else
		{
			this.$ = jQuery;
			this.onJQLoaded();
		}
	}
	
	WPMBS.prototype.injectScript = function(src)
	{
		var script = document.createElement('script');
		script.src = WPM.Constants.PACKAGE_LOADER_URL;
		script.type = 'text/javascript';
		
		if (document.head) {
			document.head.appendChild(script);
		}
		else
		{
			document.body.appendChild(script);
		}
	}
	
	WPMBS.prototype.onJQLoaded = function()
	{
		Log.i('-- wpm bootstrap --');
		this.injectScript(WPM.Constants.PACKAGE_LOADER_URL);
	}
	
	WPMBS.prototype.onLoaderLoaded = function()
	{
		Log.i("-- wpm initialized --");
	}
	
	window.WPM = window.WPM || {};
	WPM.boot = function()
	{
		WPM.bootstrapObject = new WPMBS();
	}
})();

// bootstrap asap
(function(){
    var tId = setInterval(function(){if(document.readyState == "complete") onComplete()},11);
    function onComplete(){
        clearInterval(tId);    
        WPM.boot();
    };
})();