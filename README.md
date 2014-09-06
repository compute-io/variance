Variance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample variance over an array of values.


## Installation

``` bash
$ npm install compute-variance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var variance = require( 'compute-variance' );
```

## Examples

``` javascript
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

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
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