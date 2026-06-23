// title      : Example 001
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example001.jscad

function main() {
    var size = 50;
    var hole = 25;
    var radius = size / 2;
    var holeRadius = hole / 2;
    var holeLength = size * 2.5 / 2;
    
    // Create the sphere
    var sphereObj = sphere({r: radius});
    
    // Create three cylinders
    var cyl1 = cylinder({r: holeRadius, h: holeLength, center: true});
    var cyl2 = cylinder({r: holeRadius, h: holeLength, center: true});
    var cyl3 = cylinder({r: holeRadius, h: holeLength, center: true});
    
    // Rotate cylinders
    cyl1 = cyl1.rotateX(90);
    cyl2 = cyl2.rotateY(90);
    // cyl3 stays along Z axis
    
    // Subtract from sphere
return difference(
        sphereObj,
        cyl1,
        cyl2,
        cyl3  // Z-axis cylinder stays as-is
    );
}