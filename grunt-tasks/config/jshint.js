
/**
 * jshint
 * Validate files with JSHint.
 */

module.exports = function (grunt) {

	return {

		options: {
			// options here to override JSHint defaults
			esnext: true,
			curly: false,
			eqeqeq: true,
			immed: true,
			latedef: true,
			loopfunc: true,
			newcap: true,
			noarg: true,
			sub: true,
			undef: true,
			boss: true,
			eqnull: true,
			browser: true,
			globals: {
				'alert': true,
				'console': true,
				'document': true,
				'export': true,
				'import': true,
				'module': true,
				'require': true,
				'window': true,
				'Modernizr': true,
				'jQuery': true,
				'$': true,
				'webkitSpeechGrammarList': true,
				'webkitSpeechRecognitionEvent': true,
				'webkitSpeechRecognition': true,
				'Application': true
			}
		},

		files: [
			'<%= sourcePath %>/scripts/**/*.js'
		]

	};

};
