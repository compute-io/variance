/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	variance = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				variance( value );
			};
		}
	});

	it( 'should throw an error if provided accessor is not a function', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			true,
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				variance( [ 1, 2, 3 ], value );
			};
		}
	});

	it( 'should compute the sample variance', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 5.2;

		assert.strictEqual( variance( data ), expected );
	});

	it( 'should compute the sample variance using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = 5.2;
		actual = variance( data, getValue );

		function getValue( d ) {
			return d.x;
		}

		assert.strictEqual( actual, expected );
	});

	it( 'should return `null` when provided an empty array', function test() {
		var data, expected;

		data = [];
		expected = null;

		assert.strictEqual( variance( data ), expected );
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ 2 ];
		expected = 0;

		assert.strictEqual( variance( data ), expected );
	});

});
