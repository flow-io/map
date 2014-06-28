
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Stream spec:
	spec = require( 'stream-spec' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	mStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'map', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( mStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to get the map function', function test() {
		var stream = mStream();
		expect( stream.map ).to.be.a( 'function' );
	});

	it( 'should provide a method to set the map function', function test() {
		var stream = mStream();
		stream.map( map );
		assert.strictEqual( stream.map(), map );
		return;
		function map( d ) {
			return d*2;
		}
	});

	it( 'should not allow the mapper to be set to anything other than a function', function test() {
		var stream = mStream();
		
		expect( badValue( '5' ) ).to.throw( Error );
		expect( badValue( 5 ) ).to.throw( Error );
		expect( badValue( [] ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				stream.map( value );
			};
		}
	});

	it( 'should throw an error if a map function is not set', function test() {
		var stream = mStream();

		expect( stream.stream ).to.throw( Error );
	});

	it( 'should allow for simple pass through', function test( done ) {
		var numData = 1000,
			expected = new Array( numData ),
			stream,
			transform = function ( d ) {
				return d;
			},
			s;

		// Simulate some data...
		for ( var i = 0; i < numData; i++ ) {
			expected[ i ] = Math.random();
		}

		// Create a new transform stream:
		stream = mStream()
			.map( transform )
			.stream();

		// Create the stream spec:
		s = spec( stream )
			.through();

		// Mock reading from the stream:
		utils.readStream( stream, onRead );

		// Validate the stream when the stream closes:
		stream.on( 'close', s.validate );

		// Mock piping a data to the stream:
		utils.writeStream( expected, stream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual, expected );
			done();
		} // end FUNCTION onRead()
	});

	it( 'should allow for arbitrary transformations', function test( done ) {
		var numData = 1000,
			data = new Array( numData ),
			expected = new Array( numData ),
			stream,
			transform = function ( d ) {
				return {
					'x': d.x,
					'xy': d.x*d.y,
					'y2': d.y*d.y,
					'label': 'Data: '+d.x
				};
			};

		// Simulate some data...
		for ( var i = 0; i < numData; i++ ) {
			data[ i ] = {
				'x': i,
				'y': Math.random()
			};
			expected[ i ] = {
				'x': data[ i ].x,
				'xy': data[ i ].x * data[ i ].y,
				'y2': data[ i ].y * data[ i ].y,
				'label': 'Data: '+data[ i ].x
			};
		}

		// Create a new transform stream:
		stream = mStream()
			.map( transform )
			.stream();

		// Mock reading from the stream:
		utils.readStream( stream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, stream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual, expected );
			done();
		} // end FUNCTION onRead()
	});

});