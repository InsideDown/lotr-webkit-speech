/**
 * @module     Application
 * @desc       The application module defines our application
 * @author     POP <@popagency.com>
 * @copyright  Copyright (c) 2015 POP
 */

import SpeechRecognition from 'utilities/SpeechRecognition';
import Constants from 'config/Constants';
import Events from 'config/Events';
import Lumos from 'utilities/Lumos';
import breakpointChange from 'utilities/breakpointChange';

const Application = {

	/* PRIVATE PROPERTIES */


	/* PUBLIC METHODS */

	/**
	 * Initializes the application
	 * @return {void}
	 */
	initialize: function() {
		// console.log( 'Application initialize' );

		this.$window = $(window);
		this.$document = $(document);
		this.$html = $('html');
		this.$body = $('body');

		this.pageId = this.$body.attr('id');

		if (Constants.isIE9) {this.$html.addClass('ie9');}
		new Lumos({});
		new SpeechRecognition(
			{
				$el:$('#btn-start-recording'),
				$btnStop: $('#btn-stop-recording'),
				ignoreOnEnd:true,
				$log:$('#log')
			}
		);
	}

};

export default Application;
