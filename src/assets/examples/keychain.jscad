// title      : Customizable Keychain Tag
// author     : Antigravity
// license    : MIT License
// description: A customizable keychain tag with dual-sided text and border insets.

function getParameterDefinitions() {
  return [
    { name: 'tag_l', initial: 40, type: 'float', caption: 'Tag Length' },
    { name: 'tag_w', initial: 20, type: 'float', caption: 'Tag Width' },
    { name: 'font_size', initial: 2, type: 'float', caption: 'Font Size' },
    { name: 'line_spacing', initial: 1.5, type: 'float', caption: 'Line Spacing' },
    { name: 'double_sided', type: 'checkbox', checked: true, initial: true, caption: 'Double Sided' },
    { name: 'textstr0', initial: "SpinRite", type: 'text', caption: 'Top Text Line 1' },
    { name: 'textstr1', initial: "6.1 Util", type: 'text', caption: 'Top Text Line 2' },
    { name: 'textstr2', initial: "SpinRite", type: 'text', caption: 'Bottom Text Line 1' },
    { name: 'textstr3', initial: "6.1 Util", type: 'text', caption: 'Bottom Text Line 2' },
    { name: 'render_part', type: 'choice', values: ['all', 'tag', 'text'], captions: ['All', 'Tag Body Only', 'Text Only'], initial: 'all', caption: 'Render Part' },
    { name: 'tag_r', initial: 3, type: 'float', caption: 'Corner Radius' },
    { name: 'tag_h', initial: 1.5, type: 'float', caption: 'Tag Thickness' },
    { name: 'ring_ro', initial: 1.5, type: 'float', caption: 'Ring Outer Radius' },
    { name: 'ring_ri', initial: 1, type: 'float', caption: 'Ring Inner Radius' },
    { name: 'tag_border', initial: 0.8, type: 'float', caption: 'Border Width' },
    { name: 'tag_inset', initial: 0.3, type: 'float', caption: 'Tag Inset / Text Height' }
  ];
}

function tagshape(param) {
  var xpos = param.tag_l / 2 - param.tag_r - param.tag_h;
  var ypos = param.tag_w / 2 - param.tag_r - param.tag_h;
  var ringpos = param.tag_l / 2 + param.tag_w / 2 - param.ring_ro - param.tag_h;

  var c1 = CAG.circle({r: param.tag_r, center: [xpos, ypos], fn: 32});
  var c2 = CAG.circle({r: param.tag_r, center: [xpos, -ypos], fn: 32});
  var c3 = CAG.circle({r: param.tag_r, center: [-xpos, ypos], fn: 32});
  var c4 = CAG.circle({r: param.tag_r, center: [-xpos, -ypos], fn: 32});
  
  // Prevent zero/negative radius for the ring outer circle definition
  var ring_r_diff = Math.max(0.001, param.ring_ro - param.tag_h);
  var c5 = CAG.circle({r: ring_r_diff, center: [ringpos, 0], fn: 32});

  return hull(c1, c2, c3, c4, c5);
}

function blank(param) {
  var tagshape2d = tagshape(param);
  var ringpos = param.tag_l / 2 + param.tag_w / 2 - param.ring_ro - param.tag_h;
  
  // Create flat 3D object
  var flat3d = linear_extrude({height: 0.001}, tagshape2d);
  
  // Expand flat 3D object to round edges
  var expanded3d = expand(param.tag_h, 8, flat3d);
  
  // Subtract the ring hole
  var ring_hole = cylinder({
    start: [ringpos, 0, -param.tag_h],
    end: [ringpos, 0, param.tag_h],
    r: param.ring_ri,
    fn: 32
  });
  
  var diff = expanded3d.subtract(ring_hole);
  
  // Flatten top and bottom surfaces by intersecting with a cutter cube
  var cutter = cube({
    size: [param.tag_l * 2 + param.ring_ro * 4, param.tag_w * 2, param.tag_h],
    center: true
  });
  
  return diff.intersect(cutter);
}

function createTextLine(textStr, fontSize, thickness) {
  if (!textStr || textStr.trim().length === 0) {
    return new CSG(); // Return empty object if text is empty
  }
  var o = [];
  var l = vector_text(0, 0, textStr);
  l.forEach(function(s) {
    o.push(rectangular_extrude(s, { w: 0.8, h: 1 }));
  });
  if (o.length === 0) return new CSG();
  var t = union(o);
  var b = t.getBounds();
  
  // Center horizontally and vertically in X and Y
  var xCenter = (b[0].x + b[1].x) / 2;
  var yCenter = (b[0].y + b[1].y) / 2;
  
  // Scale factor: vector_text font height is ~10 units. Scale to fontSize
  var scaleFactor = fontSize / 10;
  
  // Translate to center, scale, and extrude to thickness
  t = t.translate([-xCenter, -yCenter, -b[0].z])
       .scale([scaleFactor, scaleFactor, thickness]);
  
  return t;
}

function insetShape(param) {
  var xpos = param.tag_l / 2 - param.tag_r - param.tag_h;
  var ypos = param.tag_w / 2 - param.tag_r - param.tag_h;
  var radius = param.tag_r - param.tag_border / 2;

  var c1 = CAG.circle({r: radius, center: [xpos, ypos], fn: 32});
  var c2 = CAG.circle({r: radius, center: [xpos, -ypos], fn: 32});
  var c3 = CAG.circle({r: radius, center: [-xpos, ypos], fn: 32});
  var c4 = CAG.circle({r: radius, center: [-xpos, -ypos], fn: 32});

  return hull(c1, c2, c3, c4);
}

function main(param) {
  var isDoubleSided = (param.double_sided === true || param.double_sided === 'true' || param.double_sided === 1 || param.double_sided === '1');

  // Create top text
  var line1 = createTextLine(param.textstr0, param.font_size, param.tag_inset * 2)
    .translate([0, param.font_size * param.line_spacing, 0]);
  var line2 = createTextLine(param.textstr1, param.font_size, param.tag_inset * 2)
    .translate([0, -param.font_size * param.line_spacing, 0]);
  var top_text = union(line1, line2).translate([0, 0, param.tag_h / 2 - param.tag_inset * 2]);

  // Create bottom text if double sided
  var bottom_text = new CSG();
  if (isDoubleSided) {
    var line3 = createTextLine(param.textstr2, param.font_size, param.tag_inset * 2)
      .translate([0, param.font_size * param.line_spacing, 0]);
    var line4 = createTextLine(param.textstr3, param.font_size, param.tag_inset * 2)
      .translate([0, -param.font_size * param.line_spacing, 0]);
    bottom_text = union(line3, line4)
      .translate([0, 0, param.tag_h / 2 - param.tag_inset * 2])
      .rotateY(180);
  }

  // Combine tag texts
  var tagtext = union(top_text, bottom_text);

  // Inset shape
  var top_inset = linear_extrude({height: param.tag_inset}, insetShape(param))
    .translate([0, 0, param.tag_h / 2 - param.tag_inset + 0.01]);
  
  var tag_body;
  if (isDoubleSided) {
    var bottom_inset = top_inset.rotateX(180);
    tag_body = difference(
      blank(param),
      tagtext,
      top_inset,
      bottom_inset
    );
  } else {
    tag_body = difference(
      blank(param),
      tagtext,
      top_inset
    );
  }

  if (param.render_part === "tag") {
    return tag_body;
  } else if (param.render_part === "text") {
    return tagtext.setColor([1, 0, 0]);
  } else {
    return [
      tag_body,
      tagtext.setColor([1, 0, 0])
    ];
  }
}
