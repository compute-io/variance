/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	variance = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix variance', function tests() {

	var data,
		mat,
		i;

	data = new Int32Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i + 1;
	}
	mat = matrix( data, [5,5], 'int8' );


	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the variance along matrix columns', function test() {
		var out, p, expected;

		out = matrix( [5,1], 'float64' );

		p = variance( out, mat );
		expected = '2.5;2.5;2.5;2.5;2.5';

		assert.strictEqual( p.toString(), expected );

		p = variance( out, mat, false, 2 );
		expected = '2.5;2.5;2.5;2.5;2.5';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should compute the variance along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,5], 'float64' );

		p = variance( out, mat, false, 1 );
		expected = '62.5,62.5,62.5,62.5,62.5';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should compute the (biased) variance along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,5], 'float64' );

		p = variance( out, mat, true, 1 );
		expected = '50,50,50,50,50';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( variance( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( variance( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( variance( out, mat ) );
	});

});
