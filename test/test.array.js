/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	variance = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the variance', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 5.2;

		assert.strictEqual( variance( data ), expected );
	});

	it( 'should compute the (biased) variance', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 4.333333333333333;

		assert.strictEqual( variance( data, true ), expected );
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ 2 ];
		expected = 0;

		assert.strictEqual( variance( data ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( variance( [] ) );
	});

});
