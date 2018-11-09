/**
 * @module     breakpointChange
 * @desc       Create pseudo 'breakpointChange' event
 * @author     POP <@popagency.com>
 * @copyright  Copyright (c) 2015 POP
 */

import Constants from 'config/Constants';
import Events from 'config/Events';

const breakpointChange = function() {
	var $elIndicator = $('<div></div>',{
		'id': 'breakpoint-indicator'
	}).appendTo($('body'));

	var zIndex = $elIndicator.css('z-index');
	Constants.currentBreakpoint = Constants.breakpoints[zIndex];

	$(window).on('resize', function(event) {
		var newZI = $elIndicator.css('z-index');
		if (newZI !== zIndex) {
			zIndex = newZI;
			Constants.currentBreakpoint = Constants.breakpoints[zIndex];
			$.event.trigger(Events.BREAKPOINT_CHANGE, {breakpoint: Constants.currentBreakpoint});
		}
	});
};

export default breakpointChange;
