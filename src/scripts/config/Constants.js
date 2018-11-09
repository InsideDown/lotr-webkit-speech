/**
 * @module     Constants
 * @desc       Defines application constants
 * @author     POP <@popagency.com>
 * @copyright  Copyright (c) 2015 POP
 */

const Constants = {
	LIGHTID: 4, 
	BASEURL: 'ENTER YOUR URL',
	USERNAME: 'ENVER YOUR USERNAME',
	/**
	 * Check for IE9
	 * @type {Boolean}
	 */
	isIE9: navigator.userAgent.indexOf('MSIE 9') !== -1,

	/**
	 * Current breakpoint name (mobile, tablet, desktop)
	 * @type {String}
	 */
	currentBreakpoint: null,

	/**
	 * Breakpoint name based on z-index
	 * @type {Object}
	 */
	breakpoints: {
		1: 'mobile',
		2: 'tablet',
		3: 'desktop'
	}

};

export default Constants;
