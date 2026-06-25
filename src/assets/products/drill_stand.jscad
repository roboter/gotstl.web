// title      : Parametric Drill and Hex-Bit Stand
// author     : Antigravity
// license    : MIT License
// description: Customizable stand for drill bits and hex bits with variable rows and hole shapes
// file       : drill_stand.jscad
// tags       : drill, hex bit, stand, tool holder, organizer, parametric, 3d printing

function getParameterDefinitions() {
  return [
    {
      name: 'rows',
      type: 'int',
      caption: 'Number of Rows',
      initial: 3
    },
    {
      name: 'holes_per_row',
      type: 'int',
      caption: 'Holes per Row',
      initial: 10
    },
    {
      name: 'hole_diameter',
      type: 'float',
      caption: 'Hole Diameter (mm)',
      initial: 6.5
    },
    {
      name: 'hole_shape',
      type: 'choice',
      caption: 'Hole Shape',
      values: ['round', '5_corner', '6_corner'],
      captions: ['Round (Drills)', '5-Corner (Drills)', '6-Corner (Hex Bits)'],
      initial: '6_corner'
    },
    {
      name: 'stand_height',
      type: 'float',
      caption: 'Stand Height (mm)',
      initial: 15
    },
    {
      name: 'spacing',
      type: 'float',
      caption: 'Hole Spacing (mm)',
      initial: 12
    }
  ];
}

function main(params) {
  let rows = parseInt(params.rows) || 3;
  let cols = parseInt(params.holes_per_row) || 10;
  let d = parseFloat(params.hole_diameter) || 6.5;
  let shape = params.hole_shape || '6_corner';
  let height = parseFloat(params.stand_height) || 15;
  let spacing = parseFloat(params.spacing) || 12;

  // Stand base dimensions
  let width = cols * spacing;
  let depth = rows * spacing;
  
  // Create base block
  // Using a cube that is centered horizontally, but rests on Z=0
  let stand = CSG.cube({
    center: [0, 0, height/2],
    radius: [width/2, depth/2, height/2]
  });

  // Calculate resolution for holes based on shape
  let res = 32;
  if (shape === '5_corner') {
    res = 5;
  } else if (shape === '6_corner') {
    res = 6;
  }

  // To maintain proper fit for hex bits, circumscribed circle radius needs adjustment
  // For a hexagon, if d is the flat-to-flat distance, the circumradius is d / sqrt(3)
  // But typically user inputs hole_diameter as the bit size (e.g. 6.35 for 1/4" hex bit)
  let r = d / 2;
  if (shape === '6_corner') {
    r = (d / 2) / Math.cos(Math.PI / 6);
  } else if (shape === '5_corner') {
    r = (d / 2) / Math.cos(Math.PI / 5);
  }

  // Create a single hole cylinder (taller than stand to ensure clean subtraction)
  // We want the holes to not go all the way through, leaving a 2mm base
  let holeDepth = height - 2;
  let hole = CSG.cylinder({
    start: [0, 0, 2],
    end: [0, 0, height + 1],
    radius: r,
    resolution: res
  });
  
  // If hex, align the flat side
  if (shape === '6_corner' || shape === '5_corner') {
    hole = hole.rotateZ(180 / res); // rotate to align flat face
  }

  // Create array of holes
  let holes = [];
  let startX = -(width/2) + (spacing/2);
  let startY = -(depth/2) + (spacing/2);
  
  for (let r_idx = 0; r_idx < rows; r_idx++) {
    for (let c_idx = 0; c_idx < cols; c_idx++) {
      let h = hole.translate([startX + c_idx * spacing, startY + r_idx * spacing, 0]);
      holes.push(h);
    }
  }

  // Subtract all holes from stand
  let finalStand = stand.subtract(holes);

  // Add chamfer to bottom edge or just color it
  return finalStand.setColor([0.15, 0.45, 0.85]);
}
