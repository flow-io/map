/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	Transform = require( 'readable-stream' ).Transform,
	through2 = require( 'through2' ),
	map = require( './fixtures/map.js' ),
	Stream = require( './../lib/stream.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Stream', function tests() {

	it( 'should export a function', function test() {
		expect( Stream ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( foo ).to.throw( TypeError );
		function foo() {
			var s = new Stream({
				'allowHalfOpen': 'beep'
			}, map );
		}
	});

	it( 'should return a Transform stream', function test() {
		var s = new Stream( map );
		assert.instanceOf( s, Transform );
	});

	it( 'should not require the `new` operator', function test() {
		var stream = Stream,
			s;

		s = stream( map );
		assert.instanceOf( s, Transform );

		s = stream( {}, map );
		assert.instanceOf( s, Transform );
	});

	it( 'should apply a map function to streamed data', function test( done ) {
		var expected,
			cnt,
			s, t;

		s = new Stream( fcn );
		t = through2( onData );

		expected = ['0','2','6'];
		cnt = 0;

		s.pipe( t );
		s.write( '1' );
		s.write( '2' );
		s.write( '3' );
		s.end();

		function fcn( chunk, idx ) {
			chunk = parseFloat( chunk.toString() );
			chunk = chunk * idx;
			return chunk.toString();
		}

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should, by default, operate in object mode', function test( done ) {
		var expected,
			cnt,
			s, t;

		s = new Stream( fcn );
		t = through2.obj( onData );

		expected = [ 0, 2, 6 ];
		cnt = 0;

		s.pipe( t );
		s.write( '1' );
		s.write( '2' );
		s.write( '3' );
		s.end();

		function fcn( chunk, idx ) {
			chunk = parseFloat( chunk.toString() );
			chunk = chunk * idx;
			return chunk;
		}

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk, expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should map streamed data when explicitly in object mode', function test( done ) {
		var expected,
			cnt,
			s, t;

		s = new Stream({
			'objectMode': true
		}, fcn );
		t = through2.obj( onData );

		expected = [ 0, 2, 6 ];
		cnt = 0;

		s.pipe( t );
		s.write( '1' );
		s.write( '2' );
		s.write( '3' );
		s.end();

		function fcn( chunk, idx ) {
			chunk = parseFloat( chunk.toString() );
			chunk = chunk * idx;
			return chunk;
		}

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk, expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should provide a method to destroy a stream', function test( done ) {
		var count = 0,
			s;

		s = new Stream( map );

		expect( s.destroy ).to.be.a( 'function' );

		s.on( 'error', onError );
		s.on( 'close', onClose );

		s.destroy( new Error() );

		function onError( err ) {
			count += 1;
			if ( err ) {
				assert.ok( true );
			} else {
				assert.ok( false );
			}
			if ( count === 2 ) {
				done();
			}
		}
		function onClose() {
			count += 1;
			assert.ok( true );
			if ( count === 2 ) {
				done();
			}
		}
	});

	it( 'should not allow a stream to be destroyed more than once', function test( done ) {
		var s;

		s = new Stream( map );

		s.on( 'error', onError );
		s.on( 'close', onClose );

		// If the stream is closed twice, the test will error...
		s.destroy();
		s.destroy();

		function onClose() {
			assert.ok( true );
			done();
		}
		function onError( err ) {
			assert.ok( false );
		}
	});

});
