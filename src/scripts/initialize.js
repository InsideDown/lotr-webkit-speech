/**
 * @module     initialize
 * @desc       Defines load sequence for main module
 * @author     POP <@popagency.com>
 * @copyright  Copyright (c) 2015 POP
 */

/**
 * @requires ./Application
 */
import Application from './Application';

$(function() {
	// Initialize Application
	Application.initialize();
});
