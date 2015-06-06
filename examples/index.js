'use strict';

var matrix = require( 'dstructs-matrix' ),
	variance = require( './../lib' );

var data,
	mat,
	s2,
	i;

// ----
// Plain arrays...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s2 = variance( data );
console.log( 'Arrays: %d\n', s2 );


// ----
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
console.log( 'Accessors: %d\n', s2 );


// ----
// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s2 = variance( data );
console.log( 'Typed arrays: %d\n', s2 );


// ----
// Matrices (along rows)...
mat = matrix( data, [10,10], 'int32' );
s2 = variance( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', s2.toString() );


// ----
// Matrices (along columns)...
s2 = variance( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', s2.toString() );


// ----
// Matrices (custom output data type)...
s2 = variance( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', s2.dtype, s2.toString() );
