'use strict';

var stream = require( './../lib' );

function map( value, idx ) {
	return value * idx;
}

function toString( value ) {
	return value.toString() + '\n';
}

var mStream = stream.objectMode( map ),
	tsStream = stream.objectMode( toString );

mStream
	.pipe( tsStream )
	.pipe( process.stdout );

for ( var i = 0; i < 1000; i++ ) {
	mStream.write( Math.random() );
}
mStream.end();
