'use strict';

// MODULES //

var Transform = require( 'readable-stream' ).Transform,
	copy = require( 'utils-copy' ),
	validate = require( './validate.js' );


// VARIABLES //

var DEFAULTS = require( './defaults.json' );


// STREAM //

function Stream(){}


// EXPORTS //

module.exports = Stream;
