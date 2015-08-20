'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' );


// VALDIATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - function options
* @param {Boolean} [options.objectMode] - specifies whether stream should operate in object mode
* @param {Boolean} [options.decodeStrings] - specifies whether written strings should be decoded into Buffer objects
* @param {Number} [options.highWaterMark] - specifies the Buffer level for when `write()` starts returning `false`
* @returns {Null|Error} null or an error object
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'objectMode' ) ) {
		opts.objectMode = options.objectMode;
		if ( !isBoolean( opts.objectMode ) ) {
			return new TypeError( 'invalid option. Object mode option must be a boolean primitive. Option: `' + opts.objectMode + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'decodeStrings' ) ) {
		opts.decodeStrings = options.decodeStrings;
		if ( !isBoolean( opts.decodeStrings ) ) {
			return new TypeError( 'invalid option. Decode strings option must be a boolean primitive. Option: `' + opts.decodeStrings + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'highWaterMark' ) ) {
		opts.highWaterMark = options.highWaterMark;
		if ( !isNonNegative( opts.highWaterMark ) ) {
			return new TypeError( 'invalid option. High watermark option must be a nonnegative number. Option: `' + opts.highWaterMark + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
