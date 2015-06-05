/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	variance = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor product', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the variance using an accessor', function test() {
		var data, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = 5.2;

		assert.strictEqual( variance( data, getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the (biased) variance using an accessor', function test() {
		var data, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = 4.333333333333333;

		assert.strictEqual( variance( data, getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ {'x':2} ];
		expected = 0;

		assert.strictEqual( variance( data, getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( variance( [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
