
/**
 * browserify
 * Grunt task for node-browserify.
 */

var remapify = require('remapify');

module.exports = function (grunt) {

	// list all aliases
	var aliases = [
		{
			cwd: './src/templates',
			src: './**/*.hbs',
			expose: 'templates'
		},
		{
			cwd: './src/scripts/config',
			src: './**/*.js',
			expose: 'config'
		},
		
		{
			cwd: './src/scripts/utilities',
			src: './**/*.js',
			expose: 'utilities'
		},
		{
			cwd: './src/scripts/views',
			src: './**/*.js',
			expose: 'views'
		},
		{
			cwd: './src/scripts/widgets',
			src: './**/*.js',
			expose: 'widgets'
		}
	];

	return {

		

		dev: {
			src: '<%= sourcePath %>/scripts/initialize.js',
			dest: '<%= localPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
			options: {
				preBundleCB: function(b) {
					b.plugin(remapify, aliases);
				},
				browserifyOptions: {
					extensions: ['.hbs'],
					fullPaths: false
				},
				debug: true
			}
		},

		dist: {
			src: '<%= sourcePath %>/scripts/initialize.js',
			dest: '<%= publicPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
			options: {
				preBundleCB: function(b) {
					b.plugin(remapify, aliases);
				},
				browserifyOptions: {
					extensions: ['.hbs'],
					fullPaths: false
				},
				debug: false
			}
		}

	};

};