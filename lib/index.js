/**
*
*	COMPUTE: variance
*
*
*	DESCRIPTION:
*		- Computes the sample variance of an array.
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

var isArray = require( 'validate.io-array' );


// VARIANCE //

/**
* FUNCTION: variance( arr[, accessor] )
*	Computes the sample variance of an array.
*
* @param {Array} arr - input array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number|null} sample variance or null
*/
function variance( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'variance()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 && typeof clbk !== 'function' ) {
		throw new TypeError( 'variance()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
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
	return M2 / ( i-1 );
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
