
const request         = require('request');
const Constants          = require('../config/Constants');

const Utils = {

	rgbToXY: function(r,g,b) {
		let cR = r/255;
		let cG = g/255;
		let cB = b/255;

		let red = (cR > 0.04045) ? Math.pow((cR + 0.055) / (1.0 + 0.055), 2.4) : (cR / 12.92);
		let green = (cG > 0.04045) ? Math.pow((cG + 0.055) / (1.0 + 0.055), 2.4) : (cG / 12.92);
		let blue = (cB > 0.04045) ? Math.pow((cB + 0.055) / (1.0 + 0.055), 2.4) : (cB / 12.92);

		let X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
		let Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
		let Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

		let finalX = X / (X + Y + Z);
		let finalY = Y / (X + Y + Z);

		return {x:finalX, y:finalY};
	},

	getRequest: function() {
		let requestURL = Constants.BASEURL + '/api/' + Constants.USERNAME + '/lights/' + Constants.LIGHTID;
		request({
			url: requestURL,
			method: 'GET',
			function(error, response, body) {
				
			}
		});
	},

	/**
	 * call a put request against a specific URL with a payload
	 * @param  {object} options options object - .json - json payload
	 *                          								.callback - callback function
	 * @return {[type]}         [description]
	 */
	putRequest: function(options) {
		let requestURL = Constants.BASEURL + '/api/' + Constants.USERNAME + '/lights/'  + Constants.LIGHTID + '/state';
		request({
			url: requestURL,
			method: 'PUT',
			json: options.json}, function(error, request, body){
				//if we have a callback
				if(options.callback) {
					if(error){
						//console.error(error);
						options.callback({'error':error});
					}else {
						options.callback({'success':true});
					}
				}
		});
	}
};

export default Utils;
