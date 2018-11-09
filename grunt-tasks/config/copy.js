
/**
 * copy
 * Copy files and folders.
 */

module.exports = function (grunt) {

	return {

		// Watch Tasks
		html: {
			files: [
				// Html File(s)
				{
					expand: true,
					src:['**/*.html'],
					cwd: '<%= sourcePath %>/html/',
					dest: '<%= localPath %>'
				}
			]
		},

		assets: {
			files: [
				// Asset files (images, fonts, videos, ... )
				{
					expand: true,
					src: ['**/*'],
					cwd: '<%= sourcePath %>/assets/',
					dest: '<%= localPath %>/<%= uiDir %>'
				}
			]
		},

		// Build Tasks
		dev: {
			files: [
				{
					expand: true,
					src: ['**/*.html'],
					cwd: '<%= sourcePath %>/html/',
					dest: '<%= localPath %>'
				},
				{
					expand: true,
					src: ['**/*'],
					cwd: '<%= sourcePath %>/assets/',
					dest: '<%= localPath %>/<%= uiDir %>'
				}
			]
		},

		dist: {
			files: [
				{
					expand: true,
					src:['**/*.html'],
					cwd: '<%= sourcePath %>/html/',
					dest: '<%= publicPath %>'
				},
				{
					expand: true,
					src:['**/*'],
					cwd: '<%= sourcePath %>/assets/',
					dest: '<%= publicPath %>/<%= uiDir %>'
				}
			]
		}

	};

};
