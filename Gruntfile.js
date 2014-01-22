/*
 * Gruntfile
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */

module.exports = function(grunt) {
	
	grunt.initConfig({
	jshint: {
	  all: [
		'Gruntfile.js',
		'tasks/*.js'
	  ],
	  options: {
		jshintrc: '.jshintrc',
	  },
	},
	
	packager: {
		test: {
			options: {
				name: 'testpkg',
				output: 'test/packaged.json'
			},
			
			files: {
				js: ['test/somejs.js'],
				css: ['test/test.css'],
				files: ['test/index.html']
			}
		}
	}
	});
	
	
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	
	// By default, lint and run all tests.
	grunt.registerTask('default', ['packager']);
}