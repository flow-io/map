'use strict';

/**
* FUNCTION: map( value, idx )
*	Maps a value to a new value, returning the new value as a newline delimited string.
*
* @param {Number} value - streamed value
* @param {Number} idx - value index
* @returns {String} new value
*/
function map( value, idx ) {
	console.log( 'VALUE: %s, INDEX: %d', value.toString(), idx );
	value = parseFloat( value.toString() ) * idx;
	return value.toString() + '\n';
} // end FUNCTION map()


// EXPORTS //

module.exports = map;
