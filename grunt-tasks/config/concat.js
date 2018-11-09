
/**
 * concat
 * Concatenate files.
 */

module.exports = function (grunt) {

	// list all vendor libs
	var vendorLibs = [
		// concat dependencies in order
		'<%= vendorPath %>/modernizr.js',
		'<%= vendorPath %>/jquery.js',
		'<%= vendorPath %>/picturefill.js',
		
		
		// Then everything else
		'<%= vendorPath %>/**/*.js'
	];

	return {

		options: {
			separator: '\n\n'
		},

		

		devlibs: {
			src: vendorLibs,
			dest: '<%= localPath %>/<%= jsOutputPath %>/vendor.js'
		},

		distlibs: {
			src: vendorLibs,
			dest: '<%= publicPath %>/<%= jsOutputPath %>/vendor.js'
		}

	};

};