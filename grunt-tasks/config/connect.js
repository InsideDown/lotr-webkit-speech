
/**
 * connect
 * Start a connect web server.
 */

module.exports = function (grunt) {

	return {

		localhost: {
			options: {
				hostname: '*',
				base: '<%= localPath %>',
				port: '<%= port %>',
				livereload: '<%= livereloadPort %>'
			}
		}

	};

};