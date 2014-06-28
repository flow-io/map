/**
*
*	STREAM: transform
*
*
*	DESCRIPTION:
*		- Encloses an event stream in a closure, where a user-defined function maps (transforms) each received datum to a new value.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/05/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] event-stream
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Module allowing for event data transformation:
		eventStream = require( 'event-stream' );


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @returns {stream} Stream instance
	*/
	function Stream() {
		this._map = null;
		return this;
	} // end FUNCTION stream()

	/**
	* METHOD: map( fcn )
	*	Setter and getter for the mapping function. If a function is provided, sets the map function. If no function is provided, returns the map function.
	*
	* @param {function} fcn - function applied to map data. Function should take one argument: [ data ]. Function should the transformed data.
	* @returns {object|function} instance object or map function
	*/
	Stream.prototype.map = function( fcn ) {
		if ( !arguments.length ) {
			return this._map;
		}
		if ( typeof fcn !== 'function' ) {
			throw new Error( 'map()::invalid input argument. Input argument must be a function.' );
		}
		this._map = fcn;
		return this;
	}; // end METHOD map()

	/**
	* METHOD: stream( clbk )
	*	Maps each datum in a data stream to another value.
	*
	* @param {function} clbk - (optional) callback to invoke in the event of an error.
	* @returns {stream} map stream
	*/
	Stream.prototype.stream = function( onError ) {
		var fcn = this._map,
			stream;

		if ( !fcn ) {
			throw new Error( 'stream()::stream not initialized. Must first set a map function.' );
		}
		stream = eventStream.map( function onData( data, callback ) {
			callback( null, fcn( data ) );
		});
		stream.on( 'error', function onError( error ) {
			if ( onError ) {
				onError( error );
				return;
			}
			console.error( error.stack );
		});
		return stream;
	}; // end METHOD stream()
		

	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();