flow-map
========

Transform stream which performs a mapping.


## Installation

``` bash
$ npm install flow-map
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	mStream = require( 'flow-map' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new stream (map a numeric data stream to 0s and 1s):
var stream = mStream()
	.map( function( d ) {
		return Math.round( d );
	})
	.stream();

// Create a pipeline:
readStream.pipe( stream )
	.pipe(
		mStream().map( function( d ) {
			return d.toString();
		})
		.stream()
	)
	.pipe( process.stdout );
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

