
/**
 * watch
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 */

module.exports = function (grunt) {

	return {

		// generic options
		options: {
			livereload: '<%= livereloadPort %>',
			spawn: false
		},

		

		// target specific
		html: {
			files: [
				'<%= sourcePath %>/html/**/*.html'
			],
			tasks: ['newer:copy:html']
		},

		styles: {
			files: [
				'<%= sourcePath %>/styles/**/*.scss'
			],
			tasks: ['sass:dev']
		},

		scripts: {
			files: [
				'<%= sourcePath %>/scripts/**/*.js'
			],
			tasks: ['newer:jshint', 'browserify:dev']
		},

		vendor: {
			files: [
				'<%= sourcePath %>/vendor/**/*'
			],
			tasks: ['concat:vendor_dev']
		},

		

		assets: {
			files: [
				'<%= sourcePath %>/assets/**/*'
			],
			tasks: ['newer:copy:assets']
		}

	};

};