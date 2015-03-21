Variance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [variance](http://en.wikipedia.org/wiki/Variance) of an array.


## Installation

``` bash
$ npm install compute-variance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var variance = require( 'compute-variance' );
```

### variance( arr[, opts] )

Computes the [variance](http://en.wikipedia.org/wiki/Variance) of an `array`. For numeric `arrays`,

``` javascript
var data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];

var s2 = variance( data );
// returns 5.067
```

The function accepts two `options`:

*	__accessor__: accessor `function` for accessing `array` values
*	__bias__: `boolean` indicating whether to compute the population variance (biased sample variance) or the (unbiased) sample variance. Default: `false`; i.e., the unbiased sample variance.

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values

``` javascript
var data = [
    {'x':2},
    {'x':4},
    {'x':5},
    {'x':3},
    {'x':4},
    {'x':3},
    {'x':1},
    {'x':5},
    {'x':6},
    {'x':9}
];

function getValue( d ) {
    return d.x;
}

var s2 = variance( data, {
	'accessor': getValue
});
// returns 5.067
```

By default, the function calculates the *unbiased* sample variance. To calculate the population variance (or a *biased* sample variance), set the `bias` option to `true`.

``` javascript
var data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];

var value = variance( data, {
	'bias': true	
});
// returns 4.56
```

__Note__: if provided an empty `array`, the function returns `null`.



## Examples

``` javascript
var variance = require( 'compute-variance' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

console.log( variance( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


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

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-variance.svg
[npm-url]: https://npmjs.org/package/compute-variance

[travis-image]: http://img.shields.io/travis/compute-io/variance/master.svg
[travis-url]: https://travis-ci.org/compute-io/variance

[coveralls-image]: https://img.shields.io/coveralls/compute-io/variance/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/variance?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/variance.svg
[dependencies-url]: https://david-dm.org/compute-io/variance

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/variance.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/variance

[github-issues-image]: http://img.shields.io/github/issues/compute-io/variance.svg
[github-issues-url]: https://github.com/compute-io/variance/issues
