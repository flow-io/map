'use strict';

// MODULES //

var Stream = require( './stream.js' );


// OBJECT MODE //

/**
* FUNCTION: objectMode( [options,] fcn )
*	Returns a stream with `objectMode` set to `true`.
*
* @param {Function} fcn - map function
* @param {Object} [options] - stream options
* @param {Boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {String|Null} [options.encoding=null] - specifies how Buffer objects should be decoded to `strings`
* @param {Boolean} [options.decodeStrings=true] - specifies whether written strings should be decoded into Buffer objects
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {Boolean} [options.readableObjectMode=false] - specifies whether the readable side should be in object mode
* @param {Boolean} [options.writableObjectMode=false] - specifies whether the writable side should be in object mode
* @returns {Stream} Transform stream
*/
function objectMode( options, fcn ) {
	var opts,
		map;
	if ( arguments.length > 1 ) {
		opts = options || {};
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
