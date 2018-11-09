
/**
 * bower
 * Copy bower installed components to dist folder.
 */

module.exports = function (grunt) {

	return {

		dev: {
			options: {
				stripJsAffix: true,
				keepExpandedHierarchy: false,
				expand: false
			},
			dest: '<%= vendorPath %>'
		}

	};

};