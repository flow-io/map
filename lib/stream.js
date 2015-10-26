'use strict';

// MODULES //

var debug = require( 'debug' )( 'flow-map:main' ),
	Transform = require( 'readable-stream' ).Transform,
	copy = require( 'utils-copy' ),
	isFunction = require( 'validate.io-function' ),
	validate = require( './validate.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// STREAM //

/**
* FUNCTION: Stream( [options,] fcn )
*	Transform stream constructor.
*
* @constructor
* @param {Object} [options] - stream options
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen=false] - specifies whether a stream should remain open even if one side ends
* @param {Function} fcn - map function
* @returns {Stream} Transform stream
*/
function Stream( options, fcn ) {
	var opts,
		err,
		map;

	if ( !( this instanceof Stream ) ) {
		if ( arguments.length > 1 ) {
			return new Stream( options, fcn );
		}
		return new Stream( options );
	}
	opts = copy( DEFAULTS );
	if ( arguments.length === 1 ) {
		map = options;
	} else {
		map = fcn;
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( !isFunction( map ) ) {
		throw new TypeError( 'invalid input argument. Must provide a map function. Value: `' + map + '`.' );
	}
	// The stream always operates in objectMode:
	opts.objectMode = true;

	// Make the stream a Transform stream:
	debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
	Transform.call( this, opts );

	// Flag indicating if a stream has been destroyed:
	this._destroyed = false;

	// Cache the transform function:
	this._map = map;

	// Initialize a counter (index) to track the number of streamed datum (zero-based):
	this._idx = -1;

	return this;
} // end FUNCTION Stream()

/**
* Create a prototype which inherits from the parent prototype.
*/
Stream.prototype = Object.create( Transform.prototype );

/**
* Set the constructor.
*/
Stream.prototype.constructor = Stream;

/**
* METHOD: _transform( chunk, encoding, clbk )
*	Implements the `_transform` method.
*
* @private
* @param {Buffer|String} chunk - streamed chunk
* @param {String} encoding - Buffer encoding
* @param {Function} clbk - callback to invoke after transforming the streamed chunk
* @returns {Void}
*/
Stream.prototype._transform = function _transform( chunk, encoding, clbk ) {
	this._idx += 1;
	debug( 'Received a new chunk to transform. Chunk: %s. Index: %d.', chunk.toString(), this._idx );
	clbk( null,  this._map( chunk, this._idx ) );
}; // end METHOD _transform()

/**
* METHOD: destroy( [error] )
*	Gracefully destroys a stream, providing backwards compatibility.
*
* @param {Object} [error] - optional error message
* @returns {Stream} Stream instance
*/
Stream.prototype.destroy = function destroy( error ) {
	var self = this;
	if ( this._destroyed ) {
		debug( 'Attempted to destroy an already destroyed stream.' );
		return;
	}
	this._destroyed = true;
	process.nextTick( close );

	return this;

	/**
	* FUNCTION: close()
	*	Emits a `close` event.
	*
	* @private
	* @returns {Void}
	*/
	function close() {
		if ( error ) {
			debug( 'Stream was destroyed due to an error. Error: %s.', JSON.stringify( error ) );
			self.emit( 'error', error );
		}
		debug( 'Closing the stream...' );
		self.emit( 'close' );
	}
}; // end METHOD destroy()


// EXPORTS //

module.exports = Stream;
