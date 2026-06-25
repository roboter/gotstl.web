// title      : Customizable Extrusion Profiles
// author     : Manuel García (Original OpenSCAD) / Antigravity (OpenJSCAD port)
// license    : MIT License
// description: Generic library for fractional T-Slot extrusions.
// file       : extrusion_profile.jscad
// tags       : extrusion, t-slot, hardware, mechanical, parametric, 3d printer

const { hull } = require('@jscad/csg/api').transformations;

const ProfileCore = 4.3;     // Profile core Ø (Default M5).
const minkR_TS = 0.04 * 20;  // 0.8
const minkR_IC = 0.075 * 20; // 1.5
const minkR_PF = 0.05 * 20;  // 1.0

function getParameterDefinitions() {
  return [
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
      name: 'core',
      type: 'float',
      caption: 'Profile Core Diameter (mm)',
      initial: 4.3
    }
  ];
}

function fillet(rad) {
  let sq = CAG.rectangle({corner1: [0, 0], corner2: [rad + 0.01, rad + 0.01]});
  let c = CAG.circle({center: [0, 0], radius: rad, resolution: 32});
  return sq.subtract(c).translate([-rad, -rad]);
}

function insideCutout() {
  let sq1 = CAG.rectangle({center: [0, 0], radius: [(0.2 * 20 - minkR_IC)/2, (0.645 * 20 - 2 * minkR_IC)/2]});
  let sq2 = CAG.rectangle({center: [0, 0], radius: [(0.8 * 20 - 2 * minkR_IC)/2, (0.001 * 20)/2]});
  let h = hull(sq1, sq2);
  return h.expand(minkR_IC, 32);
}

function doubleCutout() {
  let sq1 = CAG.rectangle({center: [0, 0], radius: [(0.2 * 20 - minkR_IC)/2, (0.645 * 20 - 2 * minkR_IC)/2]});
  let sq2 = CAG.rectangle({center: [0, 0], radius: [(0.8 * 20 - 2 * minkR_IC)/2, (0.001 * 20)/2]});
  
  let h1 = hull(sq1, sq2).translate([-0.5 * 20, 0]);
  let h2 = hull(sq1, sq2).translate([0.5 * 20, 0]);
  let hullGroup1 = hull(h1, h2);
  
  let h3 = hull(sq1, sq2).translate([-0.5 * 20, 0]);
  let h4 = hull(sq1, sq2).translate([0.5 * 20, 0]);
  let hullGroup2 = hull(h3, h4).rotateZ(90);
  
  let unionGroups = hullGroup1.union(hullGroup2);
  let u = unionGroups.expand(minkR_IC, 32);
  
  u = u.union(fillet(minkR_IC).translate([-0.645 * 20 / 2, -0.645 * 20 / 2]));
  u = u.union(fillet(minkR_IC).translate([-0.645 * 20 / 2, -0.645 * 20 / 2]).rotateZ(180));
  u = u.union(fillet(minkR_IC).translate([-0.645 * 20 / 2, -0.645 * 20 / 2]).rotateZ(90));
  u = u.union(fillet(minkR_IC).translate([-0.645 * 20 / 2, -0.645 * 20 / 2]).rotateZ(-90));
  
  return u;
}

function tSlot() {
  let sq1 = CAG.rectangle({center: [0, 0], radius: [(0.001 * 20)/2, (0.585 * 20 - 2 * minkR_TS)/2]});
  let sq2 = CAG.rectangle({center: [0, 0], radius: [(0.233 * 20 - 2 * minkR_TS)/2, (0.2 * 20)/2]}).translate([(0.233 * 20 - 2 * minkR_TS) / 2, 0]);
  
  let h = hull(sq1, sq2);
  let expandedH = h.expand(minkR_TS, 32).translate([minkR_TS, 0]);
  
  let sq3 = CAG.rectangle({center: [0, 0], radius: [(0.255 * 20)/2, (0.255 * 20)/2]}).translate([-0.255 * 20 / 2 + 0.01, 0]);
  let sq4 = CAG.rectangle({center: [0, 0], radius: [(0.35 * 20)/2, (0.35 * 20)/2]}).translate([-0.35 * 20 / 2 - 0.087 * 20 + 0.01, 0]);
  
  let f1 = fillet(minkR_TS / 2).translate([0, -0.255 * 20 / 2]);
  let f2 = fillet(minkR_TS / 2).rotateZ(90).translate([-0.087 * 20, -0.255 * 20 / 2]);
  let f3 = fillet(minkR_TS / 2).translate([0, -0.255 * 20 / 2]).scale([1, -1]);
  let f4 = fillet(minkR_TS / 2).rotateZ(90).translate([-0.087 * 20, -0.255 * 20 / 2]).scale([1, -1]);
  
  return expandedH.union(sq3).union(sq4).union(f1).union(f2).union(f3).union(f4);
}

// Helper to batch subtractions and avoid OpenJSCAD coincident face bugs
function batchSubtract(base, items) {
  if (!items || items.length === 0) return base;
  let sub = items[0];
  for (let i = 1; i < items.length; i++) {
    sub = sub.union(items[i]);
  }
  return base.subtract(sub);
}

function create2020Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(1 * 20 - 2 * minkR_PF)/2, (1 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let circ = CAG.circle({center: [0, 0], radius: core / 2, resolution: 24});
  let t1 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0]);
  let t2 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0]).rotateZ(180);
  let t3 = tSlot().rotateZ(90).translate([0, -0.5 * 20 + 0.087 * 20]);
  let t4 = tSlot().rotateZ(-90).translate([0, 0.5 * 20 - 0.087 * 20]);
  return batchSubtract(base, [circ, t1, t2, t3, t4]);
}

function create2040Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(1 * 20 - 2 * minkR_PF)/2, (2 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0, 0.5 * 20], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [0, -0.5 * 20], radius: core / 2, resolution: 24});
  let ic = insideCutout();
  
  let t1 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20]);
  let t2 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20]).rotateZ(180);
  let t3 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -0.5 * 20]);
  let t4 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -0.5 * 20]).rotateZ(180);
  let t5 = tSlot().rotateZ(90).translate([0, -1 * 20 + 0.087 * 20]);
  let t6 = tSlot().rotateZ(-90).translate([0, 1 * 20 - 0.087 * 20]);
  
  return batchSubtract(base, [c1, c2, ic, t1, t2, t3, t4, t5, t6]);
}

function create2060Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(1 * 20 - 2 * minkR_PF)/2, (3 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0, 0], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [0, 1 * 20], radius: core / 2, resolution: 24});
  let c3 = CAG.circle({center: [0, -1 * 20], radius: core / 2, resolution: 24});
  let ic1 = insideCutout().translate([0, -0.5 * 20]);
  let ic2 = insideCutout().translate([0, 0.5 * 20]);
  
  let t1 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0]);
  let t2 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0]).rotateZ(180);
  let t3 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 1 * 20]);
  let t4 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 1 * 20]).rotateZ(180);
  let t5 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -1 * 20]);
  let t6 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -1 * 20]).rotateZ(180);
  let t7 = tSlot().rotateZ(90).translate([0, -1.5 * 20 + 0.087 * 20]);
  let t8 = tSlot().rotateZ(-90).translate([0, 1.5 * 20 - 0.087 * 20]);
  
  return batchSubtract(base, [c1, c2, c3, ic1, ic2, t1, t2, t3, t4, t5, t6, t7, t8]);
}

function create2080Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(1 * 20 - 2 * minkR_PF)/2, (4 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0, 0.5 * 20 + 20], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [0, 0.5 * 20 + 20 - 1 * 20], radius: core / 2, resolution: 24});
  let c3 = CAG.circle({center: [0, 0.5 * 20 + 20 - 2 * 20], radius: core / 2, resolution: 24});
  let c4 = CAG.circle({center: [0, 0.5 * 20 + 20 - 3 * 20], radius: core / 2, resolution: 24});
  
  let ic1 = insideCutout().translate([0, 0.5 * 20 + 20 - 0.5 * 20]);
  let ic2 = insideCutout();
  let ic3 = insideCutout().translate([0, -(0.5 * 20 + 20) + 0.5 * 20]);
  
  let t1 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -(0.5 * 20 + 20)]).rotateZ(180);
  let t2 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -(0.5 * 20)]).rotateZ(180);
  let t3 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20]).rotateZ(180);
  let t4 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20 + 20]).rotateZ(180);
  let t5 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20 + 20]);
  let t6 = tSlot().translate([-0.5 * 20 + 0.087 * 20, 0.5 * 20]);
  let t7 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -(0.5 * 20)]);
  let t8 = tSlot().translate([-0.5 * 20 + 0.087 * 20, -(0.5 * 20 + 20)]);
  let t9 = tSlot().rotateZ(90).translate([0, -2 * 20 + 0.087 * 20]);
  let t10 = tSlot().rotateZ(-90).translate([0, 2 * 20 - 0.087 * 20]);
  
  return batchSubtract(base, [c1, c2, c3, c4, ic1, ic2, ic3, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10]);
}

function create4040Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(2 * 20 - 2 * minkR_PF)/2, (2 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0.5 * 20, 0.5 * 20], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [-0.5 * 20, 0.5 * 20], radius: core / 2, resolution: 24});
  let c3 = CAG.circle({center: [0.5 * 20, -0.5 * 20], radius: core / 2, resolution: 24});
  let c4 = CAG.circle({center: [-0.5 * 20, -0.5 * 20], radius: core / 2, resolution: 24});
  
  let dc = doubleCutout();
  
  let t1 = tSlot().translate([-1 * 20 + 0.087 * 20, 0.5 * 20]);
  let t2 = tSlot().translate([-1 * 20 + 0.087 * 20, 0.5 * 20]).rotateZ(180);
  let t3 = tSlot().translate([-1 * 20 + 0.087 * 20, -0.5 * 20]);
  let t4 = tSlot().translate([-1 * 20 + 0.087 * 20, -0.5 * 20]).rotateZ(180);
  let t5 = tSlot().rotateZ(-90).translate([-0.5 * 20, 1 * 20 - 0.087 * 20]);
  let t6 = tSlot().rotateZ(-90).translate([-0.5 * 20, 1 * 20 - 0.087 * 20]).rotateZ(180);
  let t7 = tSlot().rotateZ(-90).translate([0.5 * 20, 1 * 20 - 0.087 * 20]);
  let t8 = tSlot().rotateZ(-90).translate([0.5 * 20, 1 * 20 - 0.087 * 20]).rotateZ(180);
  
  return batchSubtract(base, [c1, c2, c3, c4, dc, t1, t2, t3, t4, t5, t6, t7, t8]);
}

function create4060Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(2 * 20 - 2 * minkR_PF)/2, (2 * 30 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0.5 * 20, 1 * 20], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [-0.5 * 20, 1 * 20], radius: core / 2, resolution: 24});
  let c3 = CAG.circle({center: [0.5 * 20, 0], radius: core / 2, resolution: 24});
  let c4 = CAG.circle({center: [-0.5 * 20, 0], radius: core / 2, resolution: 24});
  let c5 = CAG.circle({center: [0.5 * 20, -1 * 20], radius: core / 2, resolution: 24});
  let c6 = CAG.circle({center: [-0.5 * 20, -1 * 20], radius: core / 2, resolution: 24});
  
  let ic1 = insideCutout().translate([-1 * 20 / 2, 1 * 20 / 2]);
  let ic2 = insideCutout().rotateZ(-90).translate([0, 2 * 20 / 2]);
  let ic3 = insideCutout().translate([1 * 20 / 2, 1 * 20 / 2]);
  let dc = doubleCutout().translate([0, -20 / 2]);
  
  let t1 = tSlot().translate([-1 * 20 + 0.087 * 20, 1 * 20]);
  let t2 = tSlot().translate([-1 * 20 + 0.087 * 20, 0]);
  let t3 = tSlot().translate([-1 * 20 + 0.087 * 20, -1 * 20]);
  let t4 = tSlot().translate([-1 * 20 + 0.087 * 20, 1 * 20]).rotateZ(180);
  let t5 = tSlot().translate([-1 * 20 + 0.087 * 20, 0]).rotateZ(180);
  let t6 = tSlot().translate([-1 * 20 + 0.087 * 20, -1 * 20]).rotateZ(180);
  let t7 = tSlot().rotateZ(90).translate([-1 * 20 / 2, -1.5 * 20 + 0.087 * 20]);
  let t8 = tSlot().rotateZ(90).translate([1 * 20 / 2, -1.5 * 20 + 0.087 * 20]);
  let t9 = tSlot().rotateZ(-90).translate([-1 * 20 / 2, 1.5 * 20 - 0.087 * 20]);
  let t10 = tSlot().rotateZ(-90).translate([1 * 20 / 2, 1.5 * 20 - 0.087 * 20]);
  
  return batchSubtract(base, [c1, c2, c3, c4, c5, c6, ic1, ic2, ic3, dc, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10]);
}

function create4080Profile(core) {
  let sq = CAG.rectangle({center: [0, 0], radius: [(2 * 20 - 2 * minkR_PF)/2, (4 * 20 - 2 * minkR_PF)/2]});
  let base = sq.expand(minkR_PF, 32);
  let c1 = CAG.circle({center: [0.5 * 20, 1.5 * 20], radius: core / 2, resolution: 24});
  let c2 = CAG.circle({center: [-0.5 * 20, 1.5 * 20], radius: core / 2, resolution: 24});
  let c3 = CAG.circle({center: [0.5 * 20, 0.5 * 20], radius: core / 2, resolution: 24});
  let c4 = CAG.circle({center: [-0.5 * 20, 0.5 * 20], radius: core / 2, resolution: 24});
  let c5 = CAG.circle({center: [0.5 * 20, -1.5 * 20], radius: core / 2, resolution: 24});
  let c6 = CAG.circle({center: [-0.5 * 20, -1.5 * 20], radius: core / 2, resolution: 24});
  let c7 = CAG.circle({center: [0.5 * 20, -0.5 * 20], radius: core / 2, resolution: 24});
  let c8 = CAG.circle({center: [-0.5 * 20, -0.5 * 20], radius: core / 2, resolution: 24});
  
  let dc1 = doubleCutout().translate([0, 1 * 20]);
  let dc2 = doubleCutout().translate([0, -1 * 20]);
  let ic1 = insideCutout().translate([0.5 * 20, 0]);
  let ic2 = insideCutout().translate([-0.5 * 20, 0]);
  
  let t1 = tSlot().translate([-1 * 20 + 0.087 * 20, 0.5 * 20]);
  let t2 = tSlot().translate([-1 * 20 + 0.087 * 20, 0.5 * 20]).rotateZ(180);
  let t3 = tSlot().translate([-1 * 20 + 0.087 * 20, -0.5 * 20]);
  let t4 = tSlot().translate([-1 * 20 + 0.087 * 20, -0.5 * 20]).rotateZ(180);
  let t5 = tSlot().translate([-1 * 20 + 0.087 * 20, 1.5 * 20]);
  let t6 = tSlot().translate([-1 * 20 + 0.087 * 20, 1.5 * 20]).rotateZ(180);
  let t7 = tSlot().translate([-1 * 20 + 0.087 * 20, -1.5 * 20]);
  let t8 = tSlot().translate([-1 * 20 + 0.087 * 20, -1.5 * 20]).rotateZ(180);
  let t9 = tSlot().rotateZ(-90).translate([-0.5 * 20, 2 * 20 - 0.087 * 20]);
  let t10 = tSlot().rotateZ(-90).translate([-0.5 * 20, 2 * 20 - 0.087 * 20]).rotateZ(180);
  let t11 = tSlot().rotateZ(-90).translate([0.5 * 20, 2 * 20 - 0.087 * 20]);
  let t12 = tSlot().rotateZ(-90).translate([0.5 * 20, 2 * 20 - 0.087 * 20]).rotateZ(180);
  
  return batchSubtract(base, [c1, c2, c3, c4, c5, c6, c7, c8, dc1, dc2, ic1, ic2, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12]);
}

function main(params) {
  let size = params.size || '2020';
  let length = parseFloat(params.length) || 100;
  let core = parseFloat(params.core) || ProfileCore;
  
  let profile2D;
  switch(size) {
    case '2020': profile2D = create2020Profile(core); break;
    case '2040': profile2D = create2040Profile(core); break;
    case '2060': profile2D = create2060Profile(core); break;
    case '2080': profile2D = create2080Profile(core); break;
    case '4040': profile2D = create4040Profile(core); break;
    case '4060': profile2D = create4060Profile(core); break;
    case '4080': profile2D = create4080Profile(core); break;
    default: profile2D = create2020Profile(core);
  }
  
  let extrusion3D = profile2D.extrude({ offset: [0, 0, length] });
  extrusion3D = extrusion3D.translate([0, 0, -length/2]);
  
  return extrusion3D.setColor([0.8, 0.82, 0.85]);
}
