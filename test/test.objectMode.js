/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	map = require( './fixtures/map.js' ),
	Stream = require( './../lib/stream.js' ),
	objectMode = require( './../lib/objectMode.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'object mode', function tests() {

	it( 'should export a function', function test() {
		expect( objectMode ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
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
				objectMode( value, map );
			};
		}
	});

	it( 'should throw an error if not provided a map function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( Error );
			expect( badValue2( values[i] ) ).to.throw( Error );
		}
		function badValue1( value ) {
			return function() {
				objectMode( value );
			};
		}
		function badValue2( value ) {
			return function() {
				objectMode( {}, value );
			};
		}
	});

	it( 'should return a stream', function test() {
		var tStream = objectMode( map );
		assert.isTrue( tStream instanceof Stream );
	});

	it( 'should return a stream which allows writing objects', function test() {
		var tStream;

		tStream = objectMode( map );
		tStream.write( new String( 'beep' ) );
		tStream.end();
		assert.ok( true );

		// Attempt to override should not work...
		tStream = objectMode({
			// this should be overridden...
			'objectMode': false
		}, map );

		tStream.write( new String( 'beep' ) );
		tStream.end();
		assert.ok( true );
	});

});
