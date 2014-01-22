/*
 * Packager
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */

var Packager = require('../src/packager');
Packager.greet();

module.exports = function(grunt) {
	
	Packager.setGrunt(grunt);
	
	grunt.registerMultiTask('packager', 'Package css, image and javascript files into a single output json.', function()
	{
		var options = this.options({
			name: 'set-name-in-options',
			output: 'packaged.json'
		});
		
		var builder = new Packager.PackageBuilder();
		builder.package.setName(options.name);
		
		var cssFiles = null;
		var jsFiles = null;
		var files = null;
		
		this.files.forEach(function(d){
			var o = d.orig;
			if (o.dest == "js") jsFiles = o.src;
			if (o.dest == "css") cssFiles = o.src;
			if (o.dest == "files") files = o.src;
		});
		
		if (cssFiles != null) cssFiles.forEach(function(cssf){
			console.log('adding css file: '+cssf);
			var file = grunt.file.read(cssf);
			var name = (cssf.split('.')[0]).split('/');
			name = name[name.length];
			
			builder.addCss(name, file);
		});
		
		if (jsFiles != null) jsFiles.forEach(function(jsf){
			console.log('adding js file: '+jsf);
			var file = grunt.file.read(jsf);
			var name = (jsf.split('.')[0]).split('/');
			name = name[name.length];
			
			builder.addJs(name, file);
		});
		
		if (files != null) files.forEach(function(f){
			console.log('adding html file: '+f);
			var file = grunt.file.read(f);
			var name = (f.split('.')[0]).split('/');
			name = name[name.length];
			
			builder.addFile(name, file);
		});
		
		var result = builder.toString();
		
		grunt.log.writeln('Writing '+options.output+'..');
		grunt.file.write(options.output, result, { encoding: 'UTF-8' });
		grunt.log.writeln('Packaged file '+options.output+' written.');
	});
	
}