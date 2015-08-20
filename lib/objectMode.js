'use strict';

// MODULES //

var Stream = require( './stream.js' );


// OBJECT MODE //

/**
* FUNCTION: objectMode( [options] )
*	Returns a stream with `objectMode` set to `true`.
*
* @param {Object} [options] - Transform stream options
* @param {Boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {Boolean} [options.decodeStrings=true] - specifies whether written strings should be decoded into Buffer objects
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @returns {Stream} Transform stream
*/
function objectMode( options ) {
	var opts = options || {};
	opts.objectMode = true;
	return new Stream( opts );
} // end FUNCTION objectMode()


// EXPORTS //

module.exports = objectMode;
