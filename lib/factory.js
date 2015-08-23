'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	Stream = require( './stream.js' );


// FACTORY //

/**
* FUNCTION: streamFactory( [options] )
*	Creates a reusable stream factory.
*
* @param {Object} [options] - stream options
* @param {Boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {String|Null} [options.encoding=null] - specifies how Buffer objects should be decoded to `strings`
* @param {Boolean} [options.decodeStrings=true] - specifies whether written strings should be decoded into Buffer objects
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen=false] - specifies whether a stream should remain open even if one side ends
* @param {Boolean} [options.readableObjectMode=false] - specifies whether the readable side should be in object mode
* @param {Boolean} [options.writableObjectMode=false] - specifies whether the writable side should be in object mode
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
	* @param {Function} fcn - map function
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
