Map
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [transform stream](https://nodejs.org/api/stream.html) which maps each streamed value to another value.


## Installation

``` bash
$ npm install flow-map
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var stream = require( 'flow-map' );
```

#### stream( [options,] fcn )

Creates a [transform stream](https://nodejs.org/api/stream.html) which maps each streamed value to another value using a provided `function`.

``` javascript
var mStream = stream( map );

function map( value, idx ) {
	value = parseFloat( value );
	return (value * idx).toString();
}

// Pipe the output from the map stream to stdout:
mStream.pipe( process.stdout );

// Write data to the stream:
mStream.write( '5' );
// => 0

mStream.write( '4' );
// => 4

mStream.write( '10' );
// => 30

// End the stream:
mStream.end();
```

The function accepts the following `options`:

*	__objectMode__: `boolean` which specifies whether a [stream](https://nodejs.org/api/stream.html) should operate in object mode. Default: `false`.
* 	__encoding__: specifies how `Buffer` objects should be decoded to `strings`. Default: `null`.
*	__decodeStrings__: `boolean` which specifies whether written `strings` should be decoded into `Buffer` objects. Default: `true`.
*	__highWaterMark__: specifies the `Buffer` level at which `write()` calls start returning `false`. Default: `16` (16kb).
*	__allowHalfOpen__: specifies whether the stream should remain open even if one side ends. Default: `false`.
*	__readableObjectMode__: specifies whether the readable side should be in object mode. Default: `false`.
*	__writableObjectMode__: specifies whether the writable side should be in object mode. Default: `false`.

To set [stream](https://nodejs.org/api/stream.html) `options`,

``` javascript
var opts = {
	'objectMode': true,
	'encoding': 'utf8',
	'decodeStrings': false,
	'highWaterMark': 64,
	'allowHalfOpen': true,
	'readableObjectMode': true,
	'writableObjectMode': false // overridden by `objectMode` option
};

var mStream = stream( map, opts );
```


#### stream.factory( options )

Returns a reusable [stream](https://nodejs.org/api/stream.html) factory. The factory method ensures [streams](https://nodejs.org/api/stream.html) are configured identically by using the same set of provided `options`.

``` javascript
var opts = {
	'objectMode': true,
	'encoding': 'utf8',
	'decodeStrings': false,
	'highWaterMark': 64	
};

var factory = stream.factory( opts );

// Create 10 identically configured streams...
var streams = [];
for ( var i = 0; i < 10; i++ ) {
	streams.push( factory( map ) );
}
```


#### stream.objectMode( [options,] fcn )

This method is a convenience function to create [streams](https://nodejs.org/api/stream.html) which always operate in `objectMode`. The method will __always__ override the `objectMode` option in `options`.

``` javascript
var data = {
	'value': 5
};

function map( data, idx ) {
	return data.value * 10;
}

var mStream = stream.objectMode( map );
mStream.pipe( process.stdout );

mStream.write( data );
// => 50

mStream.end();
```


## Examples

``` javascript
var stream = require( 'flow-map' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g flow-map
```


### Usage

``` bash
Usage: flow-map [options] <file>

Options:

  -h,   --help                 Print this message.
  -V,   --version              Print the package version.
  -hwm, --highwatermark [hwm]  Specify how much data can be buffered into memory
                               before applying back pressure. Default: 16kb.
  -enc, --encoding <encoding>  Set the string encoding of chunks. Default: null.
  -nds, --no-decodestrings     Prevent strings from being converted to buffers
                               before streaming to destination. Default: false.
  -om,  --objectmode           Write any value rather than only buffers and strings.
                               Default: false.
```

The `flow-map` command is available as a [standard stream](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29).

``` bash
$ <stdout> | flow-map <file> | stdin
``` 


### Examples

``` bash
$
```

For local installations, modify the above command to point to the local installation directory; e.g., 

``` bash
$ 
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ 
```



---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```



---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. The [Flow.io](https://github.com/flow-io/) Authors.


[npm-image]: http://img.shields.io/npm/v/flow-map.svg
[npm-url]: https://npmjs.org/package/flow-map

[travis-image]: http://img.shields.io/travis/flow-io/map/master.svg
[travis-url]: https://travis-ci.org/flow-io/map

[codecov-image]: https://img.shields.io/codecov/c/github/flow-io/map/master.svg
[codecov-url]: https://codecov.io/github/flow-io/map?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/map.svg
[dependencies-url]: https://david-dm.org/flow-io/map

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/map.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/map

[github-issues-image]: http://img.shields.io/github/issues/flow-io/map.svg
[github-issues-url]: https://github.com/flow-io/map/issues

