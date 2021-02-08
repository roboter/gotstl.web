/*
Scipt Version: 1.0
license: MIT License
OpenJSCad: Version: openjscad.org (V1.10.0)

Author: Michael Sendrowski, 10/2019

Title: EasyBox

Description:
Creates a pretty box of floor and lid. Stable and easy to open and close.
Simply extend the model by adding parts and holes at main() function.

Appreciation to the team of OpenJSCAD !! Geat Job ;-)

*/
function getParameterDefinitions() {
	return [{
			name: 'boxheight',
			type: 'float',
			initial: 20,
			caption: "Box Height"
		},
		{
			name: 'boxwidth',
			type: 'float',
			initial: 60,
			caption: "Box Width"
		},
		{
			name: 'boxdepth',
			type: 'float',
			initial: 90,
			caption: "Box Depth"
		},
		{
			name: 'tbthickness',
			type: 'float',
			initial: 1,
			caption: "Top Bottem Thickness"
		},
		{
			name: 'wedge',
			type: 'float',
			initial: 3 ,
			caption: "Count Wedge"
		},
		{
			name: 'wedgethickness',
			type: 'float',
			initial: 1,
			caption: "Wedge Thickness"
		},
		{
			name: 'toplift',
			type: 'slider',
			min: 0,
			max: 60,
			caption: "Lift Top"
		},
		{
			name: 'toprot',
			type: 'slider',
			min: 0,
			max: 180,
			caption: "Rotate Top"
		},
		{
			name: 'toprint',
			type: 'choice',
			values: ["off", "both", "top", "bottom"],
			captions: ["off", "both", "Top", "Bottom"],
			caption: 'Print preparation',
			initial: "aus"
		},
		{
			name: 'drawCoord',
			type: 'choice',
			values: ["on", "off"],
			captions: ["on", "off"],
			caption: 'Coordinate system',
			initial: "on"
		}
	];
}


//Wall thickness. Do not reduce, cause of instable box.
var dw = 3;

function main() {
	// View Box or Prepair for print
	switch (params.toprint) {
		case "both":
			var box = union(
				translate([0, 0, params.boxheight - params.tbthickness + params.tbthickness], rotate([0, 180, 0], top())),
				bottom()
			);
			break;
		case "off":
			var box = union(

				translate([0, 0, params.toplift], rotate([0, params.toprot * -1, 0], top())),
				bottom()
			)
			break;
		case "top":
			var box = translate([0, 0, params.boxheight - params.tbthickness + params.tbthickness], rotate([0, 180, 0], top()))
			break;
		case "bottom":
			var box = bottom()
			break;
	}
	return union(cord(params.drawCoord),
			box)

}

// Create TextObjects
function Text3D(text) {
	var l = vector_text(0, 0, text); // l contains a list of polylines to be drawn
	var o = [];
	l.forEach(function(pl) { // pl = polyline (not closed)
		o.push(rectangular_extrude(pl, {
			w: 2,
			h: 0.1
		})); // extrude it to 3D
	});
	return scale([0.5, 0.5, 1], union(o));
}

// Create coordinate system
function cord(toogle) {
	if (toogle == "on") {

		return union(
			color("red", union(
				translate([100, -5, 0], Text3D("X")),
				translate([-100, 0, -0.01], cube({
					size: [200, 1, 0.01],
					center: [false, true, true]
				})) // X Axis
			)),
			color("green", union(
				translate([-5, 100, 0], Text3D("Y")),
				translate([0, -100, -0.01], cube({
					size: [1, 200, 0.01],
					center: [true, false, true]
				})) // Y Axis
			)),
			color("blue", union(
				translate([-5, 0, 100], rotate([90, 0, 0], Text3D("Z"))),
				translate([0, 0, 0], cube({
					size: [0.3, 0.3, 100],
					center: [true, true, false]
				}))
			))
		)
	} else return difference(cube(), cube()) // Empty Object
}



function wedge(thick) {

	return difference(
		cube({
			size: [10, 3, thick]
		}),
		translate([-3.5, 0, 0],
			rotate([0, 0, 315], cube({
				size: [5, 5, thick]
			}))),
		translate([6, 0, 0],
			rotate([0, 0, 315], cube({
				size: [5, 5, thick]
			})))
	)
}

function wedgerow(count, length, solid) {
	mindist = 2;
	WEDGELN = 10;
	wcount = count - 2;
	dist1 = 2 * (WEDGELN + mindist);
	dist2 = length - dist1;
	dist3 = dist2 - wcount * WEDGELN;
	dist4 = dist3 / (count - 1) + WEDGELN;

	var kr;
	if (solid == 1) {
		kt = wedge(params.wedgethickness)
	} else {
		kt = wedgerowneg();
	}
	kr = translate([mindist, 0, 1 - params.wedgethickness], kt);
	for (k = 1; k < wcount + 1; k++) {
		kr = union(kr,
			translate([mindist + dist4 * k, 0, 1 - params.wedgethickness], kt)
		)
	}
	kr = union(kr,
		translate([length - mindist - WEDGELN, 0, 1 - params.wedgethickness], kt)
	)
	return kr;
}

// Wedge 0.1 bigger than the solid wedge
function wedgerowneg() {
	return translate([-0.5, -0.1, -0.1], scale([1.1, 1.1, 3], wedge(params.wedgethickness)))
}

// Wall from Top sliders
function walltop(boxheight, boxwidth, boxdepth, dw, tbthickness) {
	return translate([dw, 0, tbthickness],
		union(
			difference(
				cube([boxwidth, 3, (boxheight - tbthickness)]),
				translate([0, 0.75, 0],
					cube([boxwidth, 1.5, 1.75]))
			),
			// Guide rail back
			translate([-1.2, 1, 1.75], cube([2, 1, boxheight - 1.75])),
			// Guide rail front
			translate([boxwidth, 1, 1.75], cube([1.2, 1, boxheight - 1.75]))
		)
	)
}

// Top of Box with wedges rows
function top() {
	return color([0.15, 0.52, 0.93], union(
		translate([3, 0, params.boxheight - params.tbthickness], cube([params.boxwidth - dw * 2, (params.boxdepth), params.tbthickness])),
		walltop(params.boxheight - params.tbthickness, params.boxwidth - dw * 2, params.boxdepth, dw, params.tbthickness),
		translate([(params.boxwidth), (params.boxdepth), 0], rotate([0, 0, 180], walltop(params.boxheight - params.tbthickness, params.boxwidth - dw * 2, params.boxdepth, dw, params.tbthickness))),
		translate([4, dw, ((params.tbthickness + params.boxheight - params.tbthickness) - 1)], rotate([0, 0, 90], wedgerow(params.wedge, params.boxdepth - 2 * dw, 1))),
		translate([((params.boxwidth) - 4), (params.boxdepth - dw), ((params.tbthickness + params.boxheight - params.tbthickness) - 1)], rotate([0, 0, 270], wedgerow(params.wedge, params.boxdepth - 2 * dw, 1)))
	))
}

// Wall from bottom with wedges holes
function wallbottom(boxheight, boxwidth, d, tbthickness) {
	return difference(
		cube([d, (boxwidth + 2 * d), (tbthickness + boxheight)]),
		translate([1.5, 0.75, 0], cube([1.5, 1.5, (tbthickness + boxheight)])),
		translate([1.5, (boxwidth + (1 * d + 0.75)), 0], cube([1.5, 1.5, (tbthickness + boxheight)]))
	)
}
// Bottom of the Box
function bottom() {
	return color([0.015, 0.5, 0.75], union(
		// Bootom ground
		cube([(params.boxwidth), (params.boxdepth), params.tbthickness]),
		//WALL
		difference(
			translate([-0.1, 0, 0], wallbottom(params.boxheight - params.tbthickness, params.boxdepth - 2 * dw, dw, params.tbthickness)),
			translate([4, (1 * dw), ((params.tbthickness + params.boxheight - params.tbthickness) - 1)], rotate([0, 0, 90], wedgerow(params.wedge, params.boxdepth - 2 * dw, 0)))
		),
		// WALL
		difference(
			translate([(params.boxwidth + 0.1), (params.boxdepth), 0], rotate([0, 0, 180], wallbottom(params.boxheight - params.tbthickness, params.boxdepth - 2 * dw, dw, params.tbthickness))),
			translate([(params.boxwidth - 4), (params.boxdepth - 1 * dw), ((params.tbthickness + params.boxheight - params.tbthickness) - 1)], rotate([0, 0, 270], wedgerow(params.wedge, params.boxdepth - 2 * dw, 0)))
		),
		// Notch bottom front
		translate([dw, 1 - 0.1, params.tbthickness], cube([params.boxwidth - dw * 2, 1.2, 1.5])),
		// Notch bottom back
		translate([dw, (params.boxdepth - dw + 1 - 0.1), params.tbthickness], cube([params.boxwidth - dw * 2, 1.2, 1.5]))
	))
}
