'use strict';

/**
* FUNCTION: variance( arr, clbk[, bias] )
*	Computes the variance of an array using an accessor.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @param {Boolean} [bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @returns {Number|Null} variance or null
*/
function variance( arr, clbk, bias ) {
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
	for ( i = 0; i < len; i++ ) {
		x = clbk( arr[ i ], i );
		delta = x - mean;
		mean += delta / (i+1);
		M2 += delta * ( x - mean );
	}
	if ( bias ) {
		return M2 / ( i );
	}
	return M2 / ( i - 1 );
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
