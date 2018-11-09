module.exports = function(grunt) {

	var path = require('path');
	var cwd = process.cwd();
	var pkg = grunt.file.readJSON('package.json');

	var defaultLocal = './_builds/local';
	var defaultPublic = './_builds/public';
	var defaultTemp = './_builds/tmp';

	/**
	 * Load Custom tasks
	 */
	grunt.loadTasks('grunt-tasks/');

	/**
	 * GRUNT INIT
	 *
	 * Using load-grunt-config and load-grunt-task to autoload task and run grunt init
	 * in the hope of making this more automated and easier to maintain
	 *
	 * See: README for info and links
	 */
	require('load-grunt-config')( grunt, {

		configPath: path.join(cwd,'grunt-tasks/config'),
		init: true, //auto grunt.initConfig

		config: {
			/* GENERAL CONFIG OPTIONS */
			pkg: pkg,

			/**
			 * Local compiled folder, dev/debug environment
			 * @type {String}
			 */
			localPath: grunt.option('localPath') || defaultLocal,

			/**
			 * Local compiled folder, production/published files
			 * @type {String}
			 */
			publicPath: grunt.option('publicPath') || defaultPublic,

			/**
			 * Temp compiled folder, for build processing/management
			 */
			tempPath: grunt.option('tempPath') || defaultTemp,

			/**
			 * _ui directory name (holds js/css compiled output)
			 * @type {String}
			 */
			uiDir: 'assets',

			/**
			 * Compiled js path/destination
			 * @type {String}
			 */
			jsOutputPath: '<%= uiDir %>/scripts',

			/**
			 * Compiled CSS path/destination
			 * @type {String}
			 */
			cssOutputPath: '<%= uiDir %>/styles',

			/**
			 * Path to source (uncompiled) files
			 * @type {String}
			 */
			sourcePath: './src',

			/**
			 * Path to 3rd party/vendor js libs
			 * @type {String}
			 */
			vendorPath: '<%= sourcePath %>/vendor',

			/**
			 * The port number to mount the node server on
			 * @type {Number}
			 */
			port: 8001,

			/**
			 * Port number that the livereload server is run on
			 * @type {Number}
			 */
			livereloadPort: 35729
		},

		'loadGruntTasks': {
			scope: 'devDependencies',
			pattern: ['grunt-*' /*, 'specifictask or namespace-pattern'*/],
			package: require('./package.json')
		}
	});

	/**
	 * BUILD: Compile files in a new clean build
	 *
	 * build:dev,
	 * build:local,
	 * build:qa      => POP - Generate a development build
	 *
	 * default,
	 * build:dist,
	 * build:live,
	 * build:prod,
	 * build:public,
	 * build:staging => POP - Generate an optimized build
	 *
	 */
	grunt.registerTask('build', 'Generate a build', function(target) {

		var tasks = [];

		switch(target) {

			case 'dev':
			case 'local':
			case 'qa':
				target = 'dev';
				break;

			case 'dist':
			case 'live':
			case 'prod':
			case 'public':
			case 'staging':
			default:
				target = 'dist';
				break;

		}

		// Set default tasks array
		tasks = [
			'bower',
			'clean:tmp',
			'clean:' + target,
			'copy:' + target,
			//'sass:' + target,
			'autoprefixer:' + target,

			'jshint',
			'concat:' + target + 'libs',
			'browserify:' + target
		];

		// Optimize for dist build only
		if ( target === 'dist' ) {
			tasks.push('cssmin');
			tasks.push('uglify');
		}

		// Do we have a valid set of tasks to execute?
		if (tasks.length) {
			grunt.task.run(tasks);
		} else {
			grunt.log.error('Invalid target parameter passed to Grunt build function!');
		}

	});

	/**
	 * Create a dev build start a static server from the 'local' directory
	 */
	grunt.registerTask('run', ['build:dev', 'connect', 'watch']);

};
