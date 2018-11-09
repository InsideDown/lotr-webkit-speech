
/**
 * autoprefixer
 * Add vendor-prefixed CSS properties
 */

module.exports = function (grunt) {

	return {

		dev: {
			options: {
				browsers: ['last 2 versions', 'ie 9'],
				map: true
			},
			files: [{
				src: '<%= localPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
				dest: '<%= localPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
			}]
		},

		dist: {
			options: {
				browsers: ['last 2 versions', 'ie 9'],
				map: false
			},
			files: [{
				src: '<%= publicPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
				dest: '<%= publicPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
			}]
		}

	};

};