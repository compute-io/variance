'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var variance1 = require( './array.js' ),
	variance2 = require( './accessor.js' ),
	variance3 = require( './matrix.js' );


// VARIANCE //

/*
* FUNCTION: variance( x[, options] )
*	Computes the variance of elements in x.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.bias=false] - - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the variance
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} variance value(s) or null
*/
function variance( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return variance1( x.data );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'variance()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'variance()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the variance(s):
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return variance3( m, x, opts.bias, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return variance2( x, opts.accessor, opts.bias );
		}
		return variance1( x, opts.bias );
	}
	throw new TypeError( 'variance()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
