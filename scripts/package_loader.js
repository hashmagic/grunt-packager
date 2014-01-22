/*
 * Package Loader
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */
 
window.WPM = WPM || {};

WPM.debug = true;
WPM.Log = {
	warn: function(o) { console.warn(o); },
	log: function(o) { console.log(o); },
	i: function(o) { console.info(o); }
}
 
(function(){
	
	var parent = window;
	var Log = WPM.Log;
	
	/**
	 * Given a window root object, provides a context into which packages can be loaded and injects core
	 * WPM functionality into the scope.
	 */
	WPM.Context = function(window)
	{
		this.window = window;
		if (this.window.location.host != parent.location.host)
		{
			Log.warn("Warning -- Frame host mismatch. Scripts and frames may not communicate properly within the WPM context.");
		}
		
		this.injectBootstrap();
	}
	
	WPM.Context.prototype.injectScript = function(src)
	{
		var script = document.createElement('script');
		script.src = src;
		script.type = 'text/javascript';
		
		if (this.window.document.head) {
			this.window.document.head.appendChild(script);
		}
		else
		{
			this.window.document.body.appendChild(script);
		}
	}
	
	/**
	 * Programatically inject the bootstrap code into the frame (this should be replaced or unused when we load from an app-serving domain)
	 */
	WPM.Context.prototype.injectBoostrap = function()
	{
		this.injectScript(WPM.Constants.BOOTSTRAP_URL);
	}
});

(function(){
	if (WPM.bootstrapObject)
	{
		WPM.bootstrapObject.onLoaderLoaded();
	}
});