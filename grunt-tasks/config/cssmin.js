
/**
 * cssmin
 * Minify CSS
 */

module.exports = function (grunt) {

	return {

		dist: {
			files: [
				{
					src: '<%= publicPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
					dest: '<%= publicPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
				}
			]
		}

	};

};