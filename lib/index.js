/**
*
*	COMPUTE: variance
*
*
*	DESCRIPTION:
*		- Computes the variance of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' );


// VARIANCE //

/**
* FUNCTION: variance( arr[, options] )
*	Computes the variance of an array.
*
* @param {Array} arr - input array
* @param {Object} [options] - function options
* @param {Boolean} [options.bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @param {Function} [options.accessor] - accessor function for accessing array values
* @returns {Number|null} variance or null
*/
function variance( arr, opts ) {
	var bias = false,
		clbk;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'variance()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1  ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'variance()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'bias' ) ) {
			bias = opts.bias;
			if ( !isBoolean( bias ) ) {
				throw new TypeError( 'variance()::invalid option. Bias option must be a boolean primitive. Value: `' + bias + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'variance()::invalid option. Accessor must be a function. Value: `' + clbk + '`.' );
			}
		}
	}
	var len = arr.length,
		delta = 0,
		mean = 0,
		M2 = 0,
		x, i;

	if ( !len ) {
		return null;
	}
	if ( len < 2 ) {
		return 0;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			x = clbk( arr[ i ] );
			delta = x - mean;
			mean += delta / (i+1);
			M2 += delta * ( x - mean );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			x = arr[ i ];
			delta = x - mean;
			mean += delta / (i+1);
			M2 += delta * ( x - mean );
		}
	}
	if ( bias ) {
		return M2 / ( i );
	} else {
		return M2 / ( i - 1 );
	}
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
