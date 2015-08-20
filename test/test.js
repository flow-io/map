/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	mStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-map', function tests() {

	it( 'should export a function', function test() {
		expect( mStream ).to.be.a( 'function' );
	});

});
