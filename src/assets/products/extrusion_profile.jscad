// title      : Customizable Extrusion Profiles
// author     : Antigravity
// license    : MIT License
// description: Parametric T-Slot and V-Slot extrusion profiles
// file       : extrusion_profile.jscad
// tags       : extrusion, t-slot, v-slot, hardware, mechanical, parametric, 3d printer

function getParameterDefinitions() {
  return [
    {
      name: 'profile_type',
      type: 'choice',
      caption: 'Profile Type',
      values: ['tslot', 'vslot'],
      captions: ['T-Slot', 'V-Slot'],
      initial: 'vslot'
    },
    {
      name: 'size',
      type: 'choice',
      caption: 'Profile Size',
      values: ['2020', '2040', '2060', '2080', '4040', '4060', '4080'],
      captions: ['20x20 mm', '20x40 mm', '20x60 mm', '20x80 mm', '40x40 mm', '40x60 mm', '40x80 mm'],
      initial: '2020'
    },
    {
      name: 'length',
      type: 'float',
      caption: 'Length (mm)',
      initial: 100
    },
    {
      name: 'center_hole_diameter',
      type: 'float',
      caption: 'Center Hole Diameter (mm)',
      initial: 4.3
    }
  ];
}

function createProfile(wUnits, hUnits, isVSlot, centerHoleD) {
  const unitSize = 20;
  const w = wUnits * unitSize;
  const h = hUnits * unitSize;
  
  // Create base solid rectangle
  let profile = CAG.rectangle({center: [0, 0], radius: [w/2, h/2]});
  
  // Add center holes
  for(let i=0; i<wUnits; i++) {
    for(let j=0; j<hUnits; j++) {
      let cx = -w/2 + unitSize/2 + i*unitSize;
      let cy = -h/2 + unitSize/2 + j*unitSize;
      let hole = CAG.circle({center: [cx, cy], radius: centerHoleD/2, resolution: 32});
      profile = profile.subtract(hole);
    }
  }
  
  // Define slot shape (opening is at y = 10, cutting downwards)
  let slotPts = [
    [-3.0, 10], [3.0, 10], [3.0, 8.2]
  ];
  if (isVSlot) {
    slotPts.push([4.5, 6.7], [4.5, 5.8], [-4.5, 5.8], [-4.5, 6.7], [-3.0, 8.2]);
  } else {
    slotPts.push([5.5, 8.2], [5.5, 5.8], [-5.5, 5.8], [-5.5, 8.2], [-3.0, 8.2]);
  }
  let slot = CAG.fromPoints(slotPts);
  
  // Subtract slots along top and bottom edges
  for(let i=0; i<wUnits; i++) {
    let cx = -w/2 + unitSize/2 + i*unitSize;
    // Top slot
    profile = profile.subtract(slot.translate([cx, h/2 - 10]));
    // Bottom slot (rotated 180)
    profile = profile.subtract(slot.rotateZ(180).translate([cx, -h/2 + 10]));
  }
  
  // Subtract slots along left and right edges
  for(let j=0; j<hUnits; j++) {
    let cy = -h/2 + unitSize/2 + j*unitSize;
    // Right slot (rotated -90)
    profile = profile.subtract(slot.rotateZ(-90).translate([w/2 - 10, cy]));
    // Left slot (rotated 90)
    profile = profile.subtract(slot.rotateZ(90).translate([-w/2 + 10, cy]));
  }
  
  // Add chamfers for V-slot at the 4 outer corners
  if (isVSlot) {
    let chamfer = CAG.fromPoints([[10, 8.5], [10, 10], [8.5, 10]]);
    profile = profile.subtract(chamfer.translate([w/2 - 10, h/2 - 10]));
    profile = profile.subtract(chamfer.rotateZ(90).translate([-w/2 + 10, h/2 - 10]));
    profile = profile.subtract(chamfer.rotateZ(180).translate([-w/2 + 10, -h/2 + 10]));
    profile = profile.subtract(chamfer.rotateZ(270).translate([w/2 - 10, -h/2 + 10]));
  }
  
  return profile;
}

function main(params) {
  let isVSlot = params.profile_type === 'vslot';
  let size = params.size || '2020';
  let length = parseFloat(params.length) || 100;
  let centerHoleD = parseFloat(params.center_hole_diameter) || 4.3;
  
  let wUnits = 1;
  let hUnits = 1;
  
  if (size === '2040') { wUnits = 2; hUnits = 1; }
  else if (size === '2060') { wUnits = 3; hUnits = 1; }
  else if (size === '2080') { wUnits = 4; hUnits = 1; }
  else if (size === '4040') { wUnits = 2; hUnits = 2; }
  else if (size === '4060') { wUnits = 3; hUnits = 2; }
  else if (size === '4080') { wUnits = 4; hUnits = 2; }
  
  let profile2D = createProfile(wUnits, hUnits, isVSlot, centerHoleD);
  
  let extrusion3D = profile2D.extrude({ offset: [0, 0, length] });
  extrusion3D = extrusion3D.translate([0, 0, -length/2]);
  
  return extrusion3D.setColor([0.8, 0.82, 0.85]);
}
