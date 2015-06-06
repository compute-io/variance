Variance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [variance](http://en.wikipedia.org/wiki/Variance).

The [population variance](http://en.wikipedia.org/wiki/Variance) (biased sample variance) is defined as

<div class="equation" align="center" data-raw-text="\sigma^2 = \frac{1}{N} \sum_{i=0}^{N-1} \left(x_i - \overline{x} \right)^2" data-equation="eq:population_variance">
	<img src="https://cdn.rawgit.com/compute-io/variance/2b812a7ecb17a847cc39ed5730f13114636553d4/docs/img/eqn2.svg" alt="Equation for the population (biased sample) variance.">
	<br>
</div>

and the unbiased [sample variance](http://en.wikipedia.org/wiki/Variance) is defined as

<div class="equation" align="center" data-raw-text="s^2 = \frac{1}{N-1} \sum_{i=0}^{N-1} \left(x_i - \overline{x} \right)^2" data-equation="eq:sample_variance">
	<img src="https://cdn.rawgit.com/compute-io/variance/bdaaeaeb1718476b61f462cf3e5252d7b4c0c585/docs/img/eqn.svg" alt="Equation for the unbiased sample variance.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.


## Installation

``` bash
$ npm install compute-variance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var variance = require( 'compute-variance' );
```

### variance( x[, opts] )

Computes the [variance](http://en.wikipedia.org/wiki/Variance). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, s2;

data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];
s2 = variance( data );
// returns 5.067

data = new Int8Array( data );
s2 = variance( data );
// returns 5.067
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values.

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

By default, the function calculates the *unbiased* sample [variance](http://en.wikipedia.org/wiki/Variance). To calculate the population [variance](http://en.wikipedia.org/wiki/Variance) (or a *biased* sample [variance](http://en.wikipedia.org/wiki/Variance)), set the `bias` option to `true`.

``` javascript
var data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];

var sigma2 = variance( data, {
	'bias': true
});
// returns 4.56
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following additional `options`:

*	__dim__: dimension along which to compute the [variance](http://en.wikipedia.org/wiki/Variance). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [variance](http://en.wikipedia.org/wiki/Variance) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	s2,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

s2 = variance( mat );
/*
	[  2.5
	   2.5
	   2.5
	   2.5
	   2.5 ]
*/
```

To compute the [variance](http://en.wikipedia.org/wiki/Variance) along the rows, set the `dim` option to `1`.

``` javascript
s2 = variance( mat, {
	'dim': 1
});
/*
	[ 62.5, 62.5, 62.5, 62.5, 62.5 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
s2 = variance( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 62.5, 62.5, 62.5, 62.5, 62.5 ]
*/

var dtype = s2.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9  ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,10], 'int8' );
s2 = variance( mat );
// returns 5.067

// Column vector:
mat = matrix( new Int8Array( data ), [10,1], 'int8' );
s2 = variance( mat );
// returns 5.067
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
s2 = variance( [] );
// returns null

s2 = variance( new Int8Array( [] ) );
// returns null

s2 = variance( matrix( [0,0] ) );
// returns null

s2 = variance( matrix( [0,10] ) );
// returns null

s2 = variance( matrix( [10,0] ) );
// returns null
```



## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	variance = require( 'compute-variance' );

var data,
	mat,
	s2,
	i;

// Plain arrays...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s2 = variance( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
s2 = variance( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s2 = variance( data );

// Matrices (along rows)...
mat = matrix( data, [10,10], 'int32' );
s2 = variance( mat, {
	'dim': 1
});

// Matrices (along columns)...
s2 = variance( mat, {
	'dim': 2
});

// Matrices (custom output data type)...
s2 = variance( mat, {
	'dtype': 'uint8'
});
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

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
