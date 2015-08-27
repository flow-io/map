'use strict';

// MODULES //

var Stream = require( './stream.js' );


// OBJECT MODE //

/**
* FUNCTION: objectMode( [options,] fcn )
*	Creates a stream with `objectMode` set to `true`.
*
* @param {Object} [options] - stream options
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen=false] - specifies whether a stream should remain open even if one side ends
* @param {Function} fcn - map function
* @returns {Stream} Transform stream
*/
function objectMode( options, fcn ) {
	var opts,
		map;
	if ( arguments.length > 1 ) {
		opts = options;
		map = fcn;
	} else {
		map = options;
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts, map );
} // end FUNCTION objectMode()


// EXPORTS //

module.exports = objectMode;
