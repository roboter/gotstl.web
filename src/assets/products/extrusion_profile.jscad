// title      : Customizable Extrusion Profiles
// author     : Antigravity
// license    : MIT License
// description: Parametric T-Slot and V-Slot extrusion profiles (10x10, 20x20, 20x40, etc.)
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
      values: ['1010', '2020', '2040'],
      captions: ['10x10 mm', '20x20 mm', '20x40 mm'],
      initial: '2020'
    },
    {
      name: 'length',
      type: 'float',
      caption: 'Length (mm)',
      initial: 50
    },
    {
      name: 'center_hole_diameter',
      type: 'float',
      caption: 'Center Hole Diameter (mm)',
      initial: 4.2
    }
  ];
}

function create2020Profile(isVSlot, centerHoleD) {
  // Base 20x20 square
  let profile = CAG.rectangle({center: [0, 0], radius: [10, 10]});
  
  // Center hole
  let centerHole = CAG.circle({center: [0, 0], radius: centerHoleD / 2, resolution: 32});
  profile = profile.subtract(centerHole);
  
  // Create one slot to subtract from the top
  // A standard 2020 slot is about 6mm wide at the opening, expanding to 11mm inside
  // Depth is about 6mm
  let slotPts = [
    [-3.0, 10], // top left opening
    [3.0, 10],  // top right opening
    [3.0, 8.2], // throat depth
  ];
  
  if (isVSlot) {
    // V-Slot has angled edges for V-wheels (45 degree chamfer essentially)
    slotPts.push([4.5, 6.7]); // angled wall outward
    slotPts.push([4.5, 4.0]); // straight down
    slotPts.push([-4.5, 4.0]);
    slotPts.push([-4.5, 6.7]);
    slotPts.push([-3.0, 8.2]);
  } else {
    // Standard T-slot
    slotPts.push([5.5, 8.2]); // straight out
    slotPts.push([5.5, 4.0]); // straight down
    slotPts.push([-5.5, 4.0]);
    slotPts.push([-5.5, 8.2]);
    slotPts.push([-3.0, 8.2]);
  }
  
  let slot = CAG.fromPoints(slotPts);
  
  // Subtract the slot from all 4 sides
  for(let i = 0; i < 4; i++) {
    // Rotate the slot 90 degrees around the origin
    // OpenJSCAD CAG rotation expects degrees
    let rotSlot = slot.rotateZ(i * 90);
    profile = profile.subtract(rotSlot);
  }
  
  // Corner chamfers/rounding for V-slot
  if (isVSlot) {
    let chamfer = CAG.fromPoints([[10, 8.5], [10, 10], [8.5, 10]]);
    for(let i = 0; i < 4; i++) {
      profile = profile.subtract(chamfer.rotateZ(i * 90));
    }
  }

  return profile;
}

function create1010Profile(isVSlot, centerHoleD) {
  // Base 10x10 square
  let profile = CAG.rectangle({center: [0, 0], radius: [5, 5]});
  
  // Center hole
  let centerHole = CAG.circle({center: [0, 0], radius: centerHoleD / 2, resolution: 32});
  profile = profile.subtract(centerHole);
  
  // 1010 slot
  let slotPts = [
    [-1.5, 5],
    [1.5, 5],
    [1.5, 4.2],
  ];
  
  if (isVSlot) {
    slotPts.push([2.25, 3.4]);
    slotPts.push([2.25, 2.0]);
    slotPts.push([-2.25, 2.0]);
    slotPts.push([-2.25, 3.4]);
    slotPts.push([-1.5, 4.2]);
  } else {
    slotPts.push([2.75, 4.2]);
    slotPts.push([2.75, 2.0]);
    slotPts.push([-2.75, 2.0]);
    slotPts.push([-2.75, 4.2]);
    slotPts.push([-1.5, 4.2]);
  }
  
  let slot = CAG.fromPoints(slotPts);
  
  for(let i = 0; i < 4; i++) {
    profile = profile.subtract(slot.rotateZ(i * 90));
  }

  return profile;
}

function main(params) {
  let isVSlot = params.profile_type === 'vslot';
  let length = parseFloat(params.length) || 50;
  let centerHoleD = parseFloat(params.center_hole_diameter) || 4.2;
  
  let profile2D;
  
  if (params.size === '1010') {
    profile2D = create1010Profile(isVSlot, centerHoleD);
  } else if (params.size === '2040') {
    // 2040 is two 2020s joined together
    let half1 = create2020Profile(isVSlot, centerHoleD).translate([10, 0]);
    let half2 = create2020Profile(isVSlot, centerHoleD).translate([-10, 0]);
    profile2D = half1.union(half2);
  } else {
    // Default 2020
    profile2D = create2020Profile(isVSlot, centerHoleD);
  }
  
  // Extrude the 2D profile to 3D
  let extrusion3D = profile2D.extrude({ offset: [0, 0, length] });
  
  // Center it on Z axis
  extrusion3D = extrusion3D.translate([0, 0, -length/2]);
  
  // Add a nice color (silver aluminum)
  return extrusion3D.setColor([0.8, 0.82, 0.85]);
}
