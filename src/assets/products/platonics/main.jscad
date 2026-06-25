/*
   License: This code is placed in the public Domain
	Contributed By: Willliam A Adams
	September 2011
	Adapted for OpenJSCAD.org by Rene K. Mueller, 2013/04/01
*/

// A couple of useful constants
Cpi = 3.14159;       // global!
Cphi = 1.61803399;
Cepsilon = 0.00000001;
//var Cpi = 3.14159;    // local!
//var Cphi = 1.61803399;
//var Cepsilon = 0.00000001;

 
// Function: clean
//
// Parameters:
//	n - A number that might be very close to zero
// Description:  
//	There are times when you want a very small number to 
// 	just be zero, instead of being that very small number.
//	This function will compare the number to an arbitrarily small 
//	number.  If it is smaller than the 'epsilon', then zero will be 
// 	returned.  Otherwise, the original number will be returned.
//

clean = function clean(n) { return (n < 0) ? ((n < -Cepsilon) ? n : 0) : 
	(n < Cepsilon) ? 0 : n; };

// Function: safediv
//
// Parameters
//	n - The numerator
//	d - The denominator
//
// Description:
//	Since division by zero is generally not a desirable thing, safediv
//	will return '0' whenever there is a division by zero.  Although this will
//	mask some erroneous division by zero errors, it is often the case
//	that you actually want this behavior.  So, it makes it convenient.
savediv = function safediv(n,d) { return (d==0) ? 0 : n/d; }


//==================================
// Degrees
//==================================

DEGREES = function DEGREES(radians) { return (180/Cpi) * radians; }

RADIANS = function RADIANS(degrees) { return Cpi/180 * degrees; }

deg = function deg(deg, min, sec) { return [deg, min===undefined?0:min, sec===undefined?0:sec]; }

deg_to_dec = function deg_to_dec(d) { return d[0] + d[1]/60 + d[2]/60/60; }


//==================================
//  Spherical coordinates
//==================================

// create an instance of a spherical coordinate
// long - rotation around z -axis
// lat - latitude, starting at 0 == 'north pole'
// rad - distance from center
sph = function sph(long, lat, rad) { return [long, lat, rad===undefined?1:rad] }

// Convert spherical to cartesian
//function sph_to_cart(s) { return [
//	clean(s[2]*sin(s[1])*cos(s[0])),  
//	clean(s[2]*sin(s[1])*sin(s[0])),
//	clean(s[2]*cos(s[1]))
//	]; }

sph_to_cart = function sph_to_cart(s) { 
   return [
	clean(s[2]*sin(s[1])*cos(s[0])),  

	clean(s[2]*sin(s[1])*sin(s[0])),

	clean(s[2]*cos(s[1]))
	]; }

// Convert from cartesian to spherical
sph_from_cart = function sph_from_cart(c) { 
   return sph(
	atan2(c[1],c[0]), 
	atan2(sqrt(c[0]*c[0]+c[1]*c[1]), c[2]), 
	sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2])
	); }

sphu_from_cart = function sphu_from_cart(c, rad) { 
   return sph(
	atan2(c[1],c[0]), 
	atan2(sqrt(c[0]*c[0]+c[1]*c[1]), c[2]), 
	rad===undefined?1:rad
	); }

// compute the chord distance between two points on a sphere
sph_dist = function sph_dist(c1, c2) { 
   return sqrt(
	c1[2]*c1[2] + c2[2]*c2[2] - 
	2*c1[2]*c2[2]*
	((cos(c1[1])*cos(c2[1])) + cos(c1[0]-c2[0])*sin(c1[1])*sin(c2[1]))   
	); }


//==========================================
//	Geodesic calculations
// 
//  Reference: Geodesic Math and How to Use It
//  By: Hugh Kenner
//  Second Paperback Edition (2003), p.74-75
//  http://www.amazon.com/Geodesic-Math-How-Hugh-Kenner/dp/0520239318
//
//  The book was used for reference, so if you want to check the math, 
//  you can plug in various numbers to various routines and see if you get
//  the same numbers in the book.
//
//  In general, there are enough routines here to implement the various
//  pieces necessary to make geodesic objects.
//==========================================

function poly_sum_interior_angles(sides) { return (sides-2)*180; }
function poly_single_interior_angle(pq) { return poly_sum_interior_angles(pq[0])/pq[0]; }


// Calculate angular deficiency of each vertex in a platonic solid
// p - sides
// q - number of edges per vertex
angular_defect = function angular_defect(pq) { return 360 - (poly_single_interior_angle(pq)*pq[1]); }
plat_deficiency = function plat_deficiency(pq) { return DEGREES(2*Cpi - pq[1]*Cpi*(1-2/pq[0])); }

plat_dihedral = function plat_dihedral(pq) { return 2 * asin( cos(180/pq[1])/sin(180/pq[0])); }

// Given a set of coordinates, return the frequency
// Simply calculated by adding up the values of the coordinates
geo_freq = function geo_freq(xyz) { return xyz[0]+xyz[1]+xyz[2]; }

// Convert between the 2D coordinates of vertices on the face triangle
// to the 3D vertices needed to calculate spherical coordinates
geo_tri2_tri3 = function geo_tri2_tri3(xyf) { return [xyf[1], xyf[0]-xyf[1], xyf[2]-xyf[0]]; }

// Given coordinates for a vertex on the octahedron face
// return the spherical coordinates for the vertex
// class 1, method 1
octa_class1 = function octa_class1(c) { 
   return sph(
	atan(safediv(c[0], c[1])),
	atan(sqrt(c[0]*c[0]+c[1]*c[1])/c[2]),
	1 
	); }

octa_class2 = function octa_class2(c) { 
   return sph(
	atan(c[0]/c[1]),
	atan( sqrt( 2*(c[0]*c[0]+c[1]*c[1])) /c[2]),
	1 
	); }

icosa_class1 = function icosa_class1(c) { 
   return 
   octa_class1(
	[
		c[0]*sin(72),  
		c[1]+c[0]*cos(72),  
		geo_freq(c)/2+c[2]/Cphi
	]); }

icosa_class2 = function icosa_class2(c) { 
   return sph(
	atan([c0]/c[1]), 
	atan(sqrt(c[0]*c[0]+c[1]*c[1]))/cos(36)*c[2],
	1
	); }
 
tetra_class1 = function tetra_class1(c) { 
   return octa_class1(
	[
		sqrt(3*c[0]),  
		2*c[1]-c[0],  
		(3*c[2]-c[0]-c[1])/sqrt(2)
	]); }

class1_icosa_chord_factor = function class1_icosa_chord_factor(v1, v2, freq) { 
   return sph_dist( 
		icosa_class1(geo_tri2_tri3( [v1[0], v1[1], freq])),
		icosa_class1(geo_tri2_tri3( [v2[0], v2[1], freq]))
	); }




/*
	Contributed By: Willliam A Adams
	September 2011
	Adapted for OpenJSCAD.org by Rene K. Mueller, 2013/04/01
*/

//var Cpi = 3.14159;
//var Cphi = 1.61803399;
//var Cepsilon = 0.00000001;

// Information about platonic solids 
// This information is useful in constructing the various solids
// can be found here: http://en.wikipedia.org/wiki/Platonic_solid
// V - vertices
// E - edges
// F - faces
// number, V, E, F, schlafli symbol, dihedral angle, element, name
//tetrahedron = [1, 4, 6, 4, [3,3], 70.5333, "fire", "tetrahedron"];
//hexahedron = [2, 8, 12, 6, [4,3], 90, "earth", "cube"];
//octahedron = [3, 6, 12, 8, [3,4], 109.467, "air", "air"];
//dodecahedron = [4, 20, 30, 12, [5,3], 116.565, "ether", "universe"];
//icosahedron = [5, 12, 30, 20, [3,5], 138.190, "water", "water"];

// Schlafli representation for the platonic solids
// Given this representation, we have enough information
// to derive a number of other attributes of the solids
var tetra_sch = [3,3];
var hexa_sch = [4,3];
var octa_sch = [3,4];
var dodeca_sch = [5,3];
var icosa_sch = [3,5];
 
// Given the schlafli representation, calculate
// the number of edges, vertices, and faces for the solid
function plat_edges(pq) { return (2*pq[0]*pq[1])/
	((2*pq[0])-(pq[0]*pq[1])+(2*pq[1])); }
function plat_vertices(pq) { return (2*plat_edges(pq))/pq[1]; }
function plat_faces(pq) { return (2*plat_edges(pq))/pq[0]; }


// Calculate angular deficiency of each vertex in a platonic solid 
// p - sides
// q - number of edges per vertex
//function angular_defect(pq) = 360 - (poly_single_interior_angle(pq)*pq[1]);
function plat_deficiency(pq) { return DEGREES(2*Cpi - pq[1]*Cpi*(1-2/pq[0])); }

function plat_dihedral(pq) { return 2 * asin( cos(180/pq[1])/sin(180/pq[0])); }

function plat_circumradius(pq, a) { 
	return (a/2)*
	tan(Cpi/pq[1])*
	tan(plat_dihedral(pq)/2);
}

function plat_midradius(pq, a) {
	return (a/2)*
	cot(Cpi/pq[0])*
	tan(plat_dihedral(pq)/2);
}

function plat_inradius(pq,a) {
	return a/(2*tan(DEGREES(Cpi/pq[0])))*
	sqrt((1-cos(plat_dihedral(pq)))/(1+cos(plat_dihedral(pq))));
}

//================================================
//	Tetrahedron
//================================================
var tetra_cart = [
	[+1, +1, +1],
	[-1, -1, +1],
	[-1, +1, -1],
	[+1, -1, -1]
];

function tetra_unit(rad) {
   rad = rad==='undefined'?1:rad;
   return [
	sph_to_cart(sphu_from_cart(tetra_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(tetra_cart[1], rad)),
	sph_to_cart(sphu_from_cart(tetra_cart[2], rad)),
	sph_to_cart(sphu_from_cart(tetra_cart[3], rad)),
	];
}

var tetrafaces = [
	[0, 3, 1],
	[0,1,2],
	[2,1,3],
	[0,2,3]
];

var tetra_edges = [
	[0,1],
	[0,2],
	[0,3], 
	[1,2], 
	[1,3], 
	[2,3],	
	];

tetrahedron = function tetrahedron(rad) { 
//tetrahedron = function(rad) { 
   rad = rad==='undefined'?1:rad;
   return [tetra_unit(rad), tetrafaces, tetra_edges]; 
}



//================================================
//	Hexahedron - Cube 
//================================================
// vertices for a unit cube with sides of length 1
var hexa_cart = [
	[0.5, 0.5, 0.5], 
	[-0.5, 0.5, 0.5], 
	[-0.5, -0.5, 0.5], 
	[0.5, -0.5, 0.5],
	[0.5, 0.5, -0.5], 
	[-0.5, 0.5, -0.5], 
	[-0.5, -0.5, -0.5], 
	[0.5, -0.5, -0.5],
];

function hexa_unit(rad) {
   rad = rad==='undefined'?1:rad;
   return [
	sph_to_cart(sphu_from_cart(hexa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[6], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[7], rad)),
	];
}

// enumerate the faces of a cube
// vertex order is clockwise winding
var hexafaces = [
	[0,3,2,1],	// top
	[0,1,5,4],
	[1,2,6,5],
	[2,3,7,6],
	[3,0,4,7],
	[4,5,6,7],	// bottom
];

var hexa_edges = [
	[0,1],
	[0,3], 
	[0,4], 
	[1,2],
	[1,5],
	[2,3],
	[2,6], 
	[3,7], 
	[4,5], 	
	[4,7], 
	[5,4],
	[5,6], 
	[6,7], 
	];


hexahedron = function hexahedron(rad) {
  rad = rad!=='undefined'?rad:1;
  return [hexa_unit(rad), hexafaces, hexa_edges]; 
}


//================================================
//	Octahedron 
//================================================

var octa_cart = [
	[+1, 0, 0],  // + x axis
	[-1, 0, 0],	// - x axis
	[0, +1, 0],	// + y axis
	[0, -1, 0],	// - y axis
	[0, 0, +1],	// + z axis
	[0, 0, -1] 	// - z axis
];

function octa_unit(rad) { 
   rad = rad!=='undefined'?rad:1;
   return [
	sph_to_cart(sphu_from_cart(octa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(octa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(octa_cart[5], rad)), 
	];
}

var octafaces = [
	[4,2,0],
	[4,0,3],
	[4,3,1],
	[4,1,2],
	[5,0,2],
	[5,3,0],
	[5,1,3],
	[5,2,1]
	];

var octa_edges = [
	[0,2], 
	[0,3],
	[0,4],
	[0,5],
	[1,2],
	[1,3],
	[1,4],
	[1,5],
	[2,4], 
	[2,5],
	[3,4],
	[3,5],
	];

octahedron = function octahedron(rad) {
   rad = rad!=='undefined'?rad:1;
   return [octa_unit(rad), octafaces, octa_edges];
}

//================================================
//	Dodecahedron
//================================================
// (+-1, +-1, +-1)
// (0, +-1/Cphi, +-Cphi)
// (+-1/Cphi, +-Cphi, 0)
// (+-Cphi, 0, +-1/Cphi)

var dodeca_cart = [
	[+1, +1, +1],			// 0, 0
	[+1, -1, +1],			// 0, 1
	[-1, -1, +1],			// 0, 2
	[-1, +1, +1],			// 0, 3

	[+1, +1, -1],			// 1, 4
	[-1, +1, -1],			// 1, 5
	[-1, -1, -1],			// 1, 6
	[+1, -1, -1],			// 1, 7

	[0, +1/Cphi, +Cphi],		// 2, 8
	[0, -1/Cphi, +Cphi],		// 2, 9
	[0, -1/Cphi, -Cphi],		// 2, 10
	[0, +1/Cphi, -Cphi],		// 2, 11

	[-1/Cphi, +Cphi, 0],		// 3, 12
	[+1/Cphi, +Cphi, 0],		// 3, 13
	[+1/Cphi, -Cphi, 0],		// 3, 14
	[-1/Cphi, -Cphi, 0],		// 3, 15

	[-Cphi, 0, +1/Cphi],		// 4, 16
	[+Cphi, 0, +1/Cphi],		// 4, 17
	[+Cphi, 0, -1/Cphi],		// 4, 18
	[-Cphi, 0, -1/Cphi],		// 4, 19
];

function dodeca_unit(rad) {
   rad = rad!=='undefined'?rad:1;
   return [
	sph_to_cart(sphu_from_cart(dodeca_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[1], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[2], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[3], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[6], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[7], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[8], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[9], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[10], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[11], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[12], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[13], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[14], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[15], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[16], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[17], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[18], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[19], rad)), 
	];
}


// These are the pentagon faces
// but CGAL has a problem rendering if things are 
// not EXACTLY coplanar
// so use the triangle faces instead
//dodeca_faces=[ 
//	[1,9,8,0,17],
//	[9,1,14,15,2],
//	[9,2,16,3,8],
//	[8,3,12,13,0],
//	[0,13,4,18,17],
//	[1,17,18,7,14],
//	[15,14,7,10,6],
//	[2,15,6,19,16],
//	[16,19,5,12,3],
//	[12,5,11,4,13],
//	[18,4,11,10,7],
//	[19,6,10,11,5]
//	];
var dodeca_faces = [
	[1,9,8], 
	[1,8,0],
	[1,0,17],
	
	[9,1,14],
	[9,14,15],
	[9,15,2],
	
	[9,2,16],
	[9,16,3],
	[9,3,8],
	
	[8,3,12],
	[8,12,13],
	[8,13,0],
	
	[0,13,4],
	[0,4,18],
	[0,18,17],
	
	[1,17,18],
	[1,18,7],
	[1,7,14],
	
	[15,14,7],
	[15,7,10],
	[15,10,6],
	
	[2,15,6],
	[2,6,19],
	[2,19,16],
	
	[16,19,5],
	[16,5,12],
	[16,12,3],
	
	[12,5,11],
	[12,11,4],
	[12,4,13],
	
	[18,4,11],
	[18,11,10],
	[18,10,7],
	
	[19,6,10],
	[19,10,11],
	[19,11,5]
	];

var dodeca_edges=[
	[0,8],
	[0,13],
	[0,17],

	[1,9],
	[1,14],
	[1,17],

	[2,9],
	[2,15],
	[2,16],

	[3,8],
	[3,12],
	[3,16],

	[4,11],
	[4,13],
	[4,18],

	[5,11],
	[5,12],
	[5,19],

	[6,10],
	[6,15],
	[6,19],

	[7,10],
	[7,14],
	[7,18],

	[8,9],
	[10,11],
	[12,13],
	[14,15],
	[16,19],
	[17,18],
	];

dodecahedron = function dodecahedron(rad) {
   rad = rad!=='undefined'?rad:1;
   return [dodeca_unit(rad), dodeca_faces, dodeca_edges];
}

//================================================
//	Icosahedron
//================================================
//
// (0, +-1, +-Cphi)
// (+-Cphi, 0, +-1)
// (+-1, +-Cphi, 0)

var icosa_cart = [
	[0, +1, +Cphi],	// 0
	[0, +1, -Cphi],	// 1
	[0, -1, -Cphi],	// 2
	[0, -1, +Cphi],	// 3

	[+Cphi, 0, +1],	// 4
	[+Cphi, 0, -1],	// 5
	[-Cphi, 0, -1],	// 6
	[-Cphi, 0, +1],	// 7

	[+1, +Cphi, 0],	// 8
	[+1, -Cphi, 0],	// 9
	[-1, -Cphi, 0],	// 10
	[-1, +Cphi, 0]	// 11
	];

function icosa_sph(rad) {
   rad = rad!=='undefined'?rad:1;
   return [
	sphu_from_cart(icosa_cart[0], rad), 
	sphu_from_cart(icosa_cart[1], rad),
	sphu_from_cart(icosa_cart[2], rad),
	sphu_from_cart(icosa_cart[3], rad),
	sphu_from_cart(icosa_cart[4], rad), 
	sphu_from_cart(icosa_cart[5], rad), 
	sphu_from_cart(icosa_cart[6], rad),
	sphu_from_cart(icosa_cart[7], rad),
	sphu_from_cart(icosa_cart[8], rad),
	sphu_from_cart(icosa_cart[9], rad), 
	sphu_from_cart(icosa_cart[10], rad), 
	sphu_from_cart(icosa_cart[11], rad),
	];
}

function icosa_unit(rad) {
   rad = rad!=='undefined'?rad:1;
   return [
	sph_to_cart(sphu_from_cart(icosa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[6], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[7], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[8], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[9], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[10], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[11], rad)),
	];
}

var icosa_faces = [ 
	[3,0,4],
	[3,4,9],
	[3,9,10],
	[3,10,7],
	[3,7,0],
	[0,8,4],
	[0,7,11],
	[0,11,8],
	[4,8,5],
	[4,5,9],
	[7,10,6],
	[7,6,11],
	[9,5,2],
	[9,2,10],
	[2,6,10],
	[1,5,8],
	[1,8,11],
	[1,11,6],
	[5,1,2],
	[2,1,6]
	];

var icosa_edges = [
	[0,3],
	[0,4],
	[0,7],
	[0,8],
	[0,11],
	[1,5],
	[1,8],
	[1,11],
	[1,6],
	[1,2],
	[2,5],
	[2,6],
	[2,9],
	[2,10],
	[3,4],
	[3,9],
	[3,10],
	[3,7],
	[4,5],
	[4,8],
	[4,9],
	[5,8],
	[5,9],
	[6,7],		
	[6,10],
	[6,11],
	[7,10],
	[7,11],
	[8,11],
	[9,10],
	];

icosahedron = function icosahedron(rad) {
   rad = rad!=='undefined'?rad:1;
   return [icosa_unit(rad), icosa_faces, icosa_edges];
}




// title: Platonics
// author: Willliam A. Adams, Rene K. Mueller
// license: Public Domain
// date: 2011/09, 2013/04/01
// description: original an OpenSCAD.org code, adapted for OpenJSCAD.org and testing recursive include()


function platonicSolid(n) {
   var a = n();
   return polyhedron({points: a[0], triangles: a[1]});
}

function platonicWire(n) {
   var a = n();
   var p = a[0];
   var t = a[1];
   var o = [];
   
   for(var i=0; i<t.length; i++) {
      for(var j=0; j<t[i].length; j++) {
         var p1 = p[t[i][j]];
         var p2 = p[t[i][(j+1)%t[i].length]];
         o.push(cylinder({start: p1, end: p2, fn:3, r: 0.02}));
      }
   }
   return union(o);
}

function main() {
   var s = [];
   s.push(platonicSolid(tetrahedron));
   s.push(platonicSolid(hexahedron));
   s.push(platonicSolid(octahedron));
   s.push(platonicSolid(dodecahedron));
   s.push(platonicSolid(icosahedron));
   for(var i=0; i<s.length; i++) {
      s[i] = s[i].scale(5).translate([(i-s.length/2)*10,0,0]);
   }
   return s;
}

