'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	Stream = require( './stream.js' );


// FACTORY //

/**
* FUNCTION: streamFactory( [options] )
*	Creates a reusable stream factory.
*
* @param {Object} [options] - Transform stream options
* @param {Boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {Boolean} [options.decodeStrings=true] - specifies whether written strings should be decoded into Buffer objects
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @returns {Function} stream factory
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		opts = copy( options );
	} else {
		opts = {};
	}
	/**
	* FUNCTION: createStream( fcn )
	*	Creates a stream.
	*
	* @returns {Stream} Transform stream
	*/
	return function createStream( fcn ) {
		if ( !arguments.length ) {
			throw new Error( 'insufficient input arguments. Must provide a map function.' );
		}
		return new Stream( opts, fcn );
	};
} // end METHOD streamFactory()


// EXPORTS //

module.exports = streamFactory;
