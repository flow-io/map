'use strict';

/**
* FUNCTION: map( value, idx )
*	Maps a value to a new value.
*
* @param {Number} value - streamed value
* @param {Number} idx - value index
* @returns {String} new value
*/
function map( value, idx ) {
	value = parseFloat( value.toString() ) * idx;
	return value.toString();
} // end FUNCTION map()


// EXPORTS //

module.exports = map;
