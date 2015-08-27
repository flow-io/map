/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	map = require( './fixtures/map.js' ),
	Stream = require( './../lib/stream.js' ),
	factory = require( './../lib/factory.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'factory', function tests() {

	it( 'should export a function', function test() {
		expect( factory ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var createStream,
			values;

		values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				createStream = factory( value );
				createStream();
			};
		}
	});

	it( 'should return a function', function test() {
		var createStream = factory();
		expect( createStream ).to.be.a( 'function' );
	});

	it( 'should return a function which creates stream instances', function test() {
		var createStream = factory();

		for ( var i = 0; i < 10; i++ ) {
			assert.isTrue( createStream( map ) instanceof Stream );
		}
	});

});
