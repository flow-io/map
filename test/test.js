/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	Stream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-map', function tests() {

	it( 'should export a function', function test() {
		expect( Stream ).to.be.a( 'function' );
	});

	it( 'should export a function to create a stream in object mode', function test() {
		expect( Stream.objectMode ).to.be.a( 'function' );
	});

	it( 'should export a stream factory', function test() {
		expect( Stream.factory ).to.be.a( 'function' );
	});

});
