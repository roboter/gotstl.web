// title      : Customizable Extrusion Plate Brackets
// author     : Dennis Hofmann (mightynozzle), converted by Antigravity
// license    : Creative Commons - Attribution - Non-Commercial (CC BY-NC 3.0)
// description: Customizable plate brackets for aluminium extrusion profiles (Misumi 2020, 2040, 4040, etc.)

function getParameterDefinitions() {
  return [
    {
      name: 'part',
      type: 'choice',
      values: [
        'all_parts__',
        'tiny_straight_bracket__',
        'short_straight_bracket__',
        'normal_straight_bracket__',
        'long_straight_bracket__',
        'short_l_shape_none_support__',
        'short_l_shape_half_support__',
        'short_l_shape_full_support__',
        'uniform_l_shape_none_support__',
        'uniform_l_shape_half_support__',
        'uniform_l_shape_full_support__',
        'short_t_shape_none_support__',
        'short_t_shape_half_support__',
        'short_t_shape_full_support__',
        'uniform_t_shape_none_support__',
        'uniform_t_shape_half_support__',
        'uniform_t_shape_full_support__',
        'short_x_shape_none_support__',
        'short_x_shape_half_support__',
        'short_x_shape_full_support__',
        'uniform_x_shape_none_support__',
        'uniform_x_shape_half_support__',
        'uniform_x_shape_full_support__'
      ],
      captions: [
        'All Brackets',
        'Tiny Straight Bracket',
        'Short Straight Bracket',
        'Normal Straight Bracket',
        'Long Straight Bracket',
        'Short L-shape Bracket (No support)',
        'Short L-shape Bracket (Half support)',
        'Short L-shape Bracket (Full support)',
        'Uniform L-shape Bracket (No support)',
        'Uniform L-shape Bracket (Half support)',
        'Uniform L-shape Bracket (Full support)',
        'Short T-shape Bracket (No support)',
        'Short T-shape Bracket (Half support)',
        'Short T-shape Bracket (Full support)',
        'Uniform T-shape Bracket (No support)',
        'Uniform T-shape Bracket (Half support)',
        'Uniform T-shape Bracket (Full support)',
        'Short X-shape Bracket (No support)',
        'Short X-shape Bracket (Half support)',
        'Short X-shape Bracket (Full support)',
        'Uniform X-shape Bracket (No support)',
        'Uniform X-shape Bracket (Half support)',
        'Uniform X-shape Bracket (Full support)'
      ],
      initial: 'all_parts__',
      caption: 'Part'
    },
    {
      name: 'width_in_millimeter',
      type: 'choice',
      values: [20, 25, 25.4, 30, 40, 45, 60, 80, 90, 120, 160],
      captions: ['20 mm', '25 mm', '25.4 mm', '30 mm', '40 mm', '45 mm', '60 mm', '80 mm', '90 mm', '120 mm', '160 mm'],
      initial: 20,
      caption: 'Extrusion Width'
    },
    { name: 'length_in_millimeter', initial: 60, type: 'float', min: 10, max: 200, step: 1, caption: 'Bracket Length (mm)' },
    { name: 'bracket_height_in_millimeter', initial: 7.0, type: 'float', min: 1, max: 30, step: 0.5, caption: 'Bracket Thickness (mm)' },
    { name: 'number_of_rails', initial: 1, type: 'int', min: 1, max: 4, step: 1, caption: 'Number of Rails/Slots' },
    { name: 'screw_hole_diameter_in_millimeter', initial: 6.4, type: 'float', min: 2, max: 20, step: 0.1, caption: 'Screw Hole Diameter (mm)' },
    { name: 'screw_head_offset_diamter_in_millimeter', initial: 12.0, type: 'float', min: 4, max: 30, step: 0.5, caption: 'Screw Head Pocket Diameter (mm)' },
    { name: 'screw_head_offset_height_in_millimeter', initial: 1.5, type: 'float', min: 0, max: 10, step: 0.1, caption: 'Screw Head Pocket Depth (mm)' },
    { name: 'number_of_extra_holes', initial: 1, type: 'int', min: 0, max: 4, step: 1, caption: 'Number of Extra Holes' }
  ];
}

// 2D Shapes Modules (translated from OpenSCAD polygons)
function tiny_I_shape(w, l) {
  return CAG.fromPoints([[l * 2 - w - ((l - w) / 2), l - w], [l * 2 - w - ((l - w) / 2), l], [l - w, l], [l - w, l - w]]);
}
function short_I_shape(w, l) {
  return CAG.fromPoints([[l * 2 - w - ((l - w) / 2), l - w], [l * 2 - w - ((l - w) / 2), l], [(l - w) / 2, l], [(l - w) / 2, l - w]]);
}
function normal_I_shape(w, l) {
  return CAG.fromPoints([[l * 2 - w - ((l - w) / 2), l - w], [l * 2 - w - ((l - w) / 2), l], [0, l], [0, l - w]]);
}
function long_I_shape(w, l) {
  return CAG.fromPoints([[l * 2 - w, l - w], [l * 2 - w, l], [0, l], [0, l - w]]);
}
function short_L_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function short_L_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function short_L_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l], [0, l], [0, l - w]]);
}
function uniform_L_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function uniform_L_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function uniform_L_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l], [0, l], [0, l - w]]);
}
function short_T_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [l - w, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function short_T_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [l - w, l + (l - w) / 2], [(l - w) / 2, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function short_T_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [0, l], [0, l - w]]);
}
function uniform_T_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l * 2 - w], [l - w, l * 2 - w], [l - w, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function uniform_T_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l * 2 - w], [l - w, l * 2 - w], [l - w, l + (l - w) / 2], [(l - w) / 2, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function uniform_T_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l * 2 - w], [l - w, l * 2 - w], [0, l], [0, l - w]]);
}
function short_X_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, l-w], [l * 2 - w, l - w], [l * 2 - w , l], [l, l], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [l - w, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function short_X_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l, (l - w) / 2], [l * 2 - w - (l - w) / 2, l - w], [l * 2 - w, l - w], [l * 2 - w , l], [l + (l - w) / 2, l], [l, l + (l - w) / 2], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [l - w, l + (l - w) / 2], [(l - w) / 2, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function short_X_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, (l - w) / 2], [l, (l - w) / 2], [l * 2 - w, l - w], [l * 2 - w , l], [l, l * 2 - w - ((l - w) / 2)], [l - w, l * 2 - w - ((l - w) / 2)], [0, l], [0, l - w]]);
}
function uniform_X_shape_none_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, l-w], [l * 2 - w, l - w], [l * 2 - w , l], [l, l], [l, l * 2 - w], [l - w, l * 2 - w], [l - w, l], [0, l], [0, l - w], [l - w, l - w]]);
}
function uniform_X_shape_half_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l, (l - w) / 2], [l * 2 - w - (l - w) / 2, l - w], [l * 2 - w, l - w], [l * 2 - w , l], [l + (l - w) / 2, l], [l, l + (l - w) / 2], [l, l * 2 - w], [l - w, l * 2 - w], [l - w, l + (l - w) / 2], [(l - w) / 2, l], [0, l], [0, l - w], [(l - w) / 2, l - w], [l - w , (l - w) / 2]]);
}
function uniform_X_shape_full_support(w, l) {
  return CAG.fromPoints([[l - w, 0], [l, 0], [l * 2 - w, l - w], [l * 2 - w , l], [l, l * 2 - w], [l - w, l * 2 - w], [0, l], [0, l - w]]);
}

// Hole cutting shapes
function hole_shape(bracket_h, hole_d, hole_offset_d, hole_offset_h) {
  var c1 = cylinder({r: hole_d / 2, h: bracket_h + 3, fn: 16}).translate([0, 0, -1]);
  var c2 = cylinder({r: hole_offset_d / 2, h: hole_offset_h + 1, fn: 16})
    .translate([0, 0, bracket_h - hole_offset_h]);
  return union(c1, c2);
}

function center_holes_cut(w, l, bracket_h, number_of_rails, hole_d, hole_offset_d, hole_offset_h) {
  var list = [];
  var base_x = l - w;
  var base_y = l - w;
  for (var x = 1; x <= number_of_rails; x++) {
    for (var y = 1; y <= number_of_rails; y++) {
      var x_pos = base_x + (w / number_of_rails) * x - (w / number_of_rails) / 2;
      var y_pos = base_y + (w / number_of_rails) * y - (w / number_of_rails) / 2;
      list.push(hole_shape(bracket_h, hole_d, hole_offset_d, hole_offset_h).translate([x_pos, y_pos, 0]));
    }
  }
  return union(list);
}

function arm_holes_cut(rotation, extra_hole, w, l, bracket_h, number_of_rails, hole_d, hole_offset_d, hole_offset_h, number_of_holes) {
  var list = [];
  var limit = number_of_holes + extra_hole - 1;
  for (var hole = 1; hole <= limit; hole++) {
    for (var rail = 1; rail <= number_of_rails; rail++) {
      var x_pos = ((l - w) / number_of_holes) * hole + w / 2 - (w / number_of_rails) / 2;
      var y_pos = -w / 2 + (w / number_of_rails) * rail - (w / number_of_rails) / 2;
      list.push(hole_shape(bracket_h, hole_d, hole_offset_d, hole_offset_h).translate([x_pos, y_pos, 0]));
    }
  }
  if (list.length === 0) return new CSG();
  var cutouts = union(list);
  return cutouts.rotateZ(rotation).translate([l - w / 2, l - w / 2, 0]);
}

function aluminium_extrusion_bracket(shape, type, support, w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, preview_color, center) {
  var shape2d;
  if(shape == "I" && type == "tiny") shape2d = tiny_I_shape(w, l);
  else if(shape == "I" && type == "short") shape2d = short_I_shape(w, l);
  else if(shape == "I" && type == "normal") shape2d = normal_I_shape(w, l);
  else if(shape == "I" && type == "long") shape2d = long_I_shape(w, l);
  else if(shape == "L" && type == "short" && support == "none") shape2d = short_L_shape_none_support(w, l);
  else if(shape == "L" && type == "short" && support == "half") shape2d = short_L_shape_half_support(w, l);
  else if(shape == "L" && type == "short" && support == "full") shape2d = short_L_shape_full_support(w, l);
  else if(shape == "L" && type == "uniform" && support == "none") shape2d = uniform_L_shape_none_support(w, l);
  else if(shape == "L" && type == "uniform" && support == "half") shape2d = uniform_L_shape_half_support(w, l);
  else if(shape == "L" && type == "uniform" && support == "full") shape2d = uniform_L_shape_full_support(w, l);
  else if(shape == "T" && type == "short" && support == "none") shape2d = short_T_shape_none_support(w, l);
  else if(shape == "T" && type == "short" && support == "half") shape2d = short_T_shape_half_support(w, l);
  else if(shape == "T" && type == "short" && support == "full") shape2d = short_T_shape_full_support(w, l);
  else if(shape == "T" && type == "uniform" && support == "none") shape2d = uniform_T_shape_none_support(w, l);
  else if(shape == "T" && type == "uniform" && support == "half") shape2d = uniform_T_shape_half_support(w, l);
  else if(shape == "T" && type == "uniform" && support == "full") shape2d = uniform_T_shape_full_support(w, l);
  else if(shape == "X" && type == "short" && support == "none") shape2d = short_X_shape_none_support(w, l);
  else if(shape == "X" && type == "short" && support == "half") shape2d = short_X_shape_half_support(w, l);
  else if(shape == "X" && type == "short" && support == "full") shape2d = short_X_shape_full_support(w, l);
  else if(shape == "X" && type == "uniform" && support == "none") shape2d = uniform_X_shape_none_support(w, l);
  else if(shape == "X" && type == "uniform" && support == "half") shape2d = uniform_X_shape_half_support(w, l);
  else if(shape == "X" && type == "uniform" && support == "full") shape2d = uniform_X_shape_full_support(w, l);
  
  if (!shape2d) return new CSG();

  var body = linear_extrude({height: h}, shape2d);

  var short = (type == "short" || type == "tiny") ? 0 : 1;
  var cutouts = [];
  
  cutouts.push(center_holes_cut(w, l, h, rails, hole_d, hole_offset_d, hole_offset_h));
  
  if(shape == "X" || shape == "I") {
    cutouts.push(arm_holes_cut(0, 1, w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes));
  }
  if(shape == "T" || shape == "X") {
    cutouts.push(arm_holes_cut(90, short, w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes));
  }
  
  cutouts.push(arm_holes_cut(180, 1, w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes));
  
  if(shape != "I") {
    cutouts.push(arm_holes_cut(270, short, w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes));
  }
  
  var final_body = difference.apply(null, [body].concat(cutouts));

  var translate_x = center ? -l + w / 2 : 0;
  var translate_y = center ? -l + w / 2 : 0;

  var colorMap = {
    "DimGray": [0.41, 0.41, 0.41],
    "DeepSkyBlue": [0.0, 0.75, 1.0],
    "HotPink": [1.0, 0.41, 0.71],
    "DarkOrange": [1.0, 0.55, 0.0],
    "Gold": [1.0, 0.84, 0.0],
    "MediumPurple": [0.58, 0.44, 0.86],
    "YellowGreen": [0.6, 0.8, 0.2]
  };

  var c = colorMap[preview_color] || [1.0, 0.41, 0.71];

  return final_body.translate([translate_x, translate_y, 0]).setColor(c);
}

function all_parts(w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes) {
  var pos0 = 0;
  var pos1 = l * 2 - w + 5;
  var pos2 = pos1 * 2;
  var pos3 = pos1 * 3;
  var pos4 = pos1 * 4;
  var pos5 = pos1 * 5;    
  
  return [
    aluminium_extrusion_bracket("L", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false).translate([pos0, pos0, 0]),
    aluminium_extrusion_bracket("L", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false).translate([pos0, pos1, 0]),
    aluminium_extrusion_bracket("L", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false).translate([pos0, pos2, 0]),
    aluminium_extrusion_bracket("L", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false).translate([pos1, pos0, 0]),
    aluminium_extrusion_bracket("L", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false).translate([pos1, pos1, 0]),
    aluminium_extrusion_bracket("L", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false).translate([pos1, pos2, 0]),
    aluminium_extrusion_bracket("T", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false).translate([pos2, pos0, 0]),
    aluminium_extrusion_bracket("T", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false).translate([pos2, pos1, 0]),
    aluminium_extrusion_bracket("T", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false).translate([pos2, pos2, 0]),
    aluminium_extrusion_bracket("T", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false).translate([pos3, pos0, 0]),
    aluminium_extrusion_bracket("T", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false).translate([pos3, pos1, 0]),
    aluminium_extrusion_bracket("T", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false).translate([pos3, pos2, 0]),
    aluminium_extrusion_bracket("X", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false).translate([pos4, pos0, 0]),
    aluminium_extrusion_bracket("X", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false).translate([pos4, pos1, 0]),
    aluminium_extrusion_bracket("X", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false).translate([pos4, pos2, 0]),
    aluminium_extrusion_bracket("X", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false).translate([pos5, pos0, 0]),
    aluminium_extrusion_bracket("X", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false).translate([pos5, pos1, 0]),
    aluminium_extrusion_bracket("X", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false).translate([pos5, pos2, 0]), 
    aluminium_extrusion_bracket("I", "tiny", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false).translate([pos0, pos3, 0]),
    aluminium_extrusion_bracket("I", "short", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false).translate([pos1, pos3, 0]),
    aluminium_extrusion_bracket("I", "normal", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false).translate([pos2, pos3, 0]),
    aluminium_extrusion_bracket("I", "long", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false).translate([pos3, pos3, 0])
  ];
}

function main(param) {
  var w = parseFloat(param.width_in_millimeter);
  var l = parseFloat(param.length_in_millimeter);
  var h = parseFloat(param.bracket_height_in_millimeter);
  var rails = parseInt(param.number_of_rails);
  var hole_d = parseFloat(param.screw_hole_diameter_in_millimeter);
  var hole_offset_d = parseFloat(param.screw_head_offset_diamter_in_millimeter);
  var hole_offset_h = parseFloat(param.screw_head_offset_height_in_millimeter);
  var holes = parseInt(param.number_of_extra_holes) + 1;

  if(param.part == "tiny_straight_bracket__") {
      return aluminium_extrusion_bracket("I", "tiny", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false);
  } else if(param.part == "short_straight_bracket__") {
      return aluminium_extrusion_bracket("I", "short", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false);
  } else if(param.part == "normal_straight_bracket__") {
      return aluminium_extrusion_bracket("I", "normal", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false);
  } else if(param.part == "long_straight_bracket__") {
      return aluminium_extrusion_bracket("I", "long", "", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "YellowGreen", false);
  } else if(param.part == "short_l_shape_none_support__") {
      return aluminium_extrusion_bracket("L", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false);
  } else if(param.part == "short_l_shape_half_support__") {
      return aluminium_extrusion_bracket("L", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false);
  } else if(param.part == "short_l_shape_full_support__") {
      return aluminium_extrusion_bracket("L", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DimGray", false);
  } else if(param.part == "uniform_l_shape_none_support__") {
      return aluminium_extrusion_bracket("L", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false);
  } else if(param.part == "uniform_l_shape_half_support__") {
      return aluminium_extrusion_bracket("L", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false);
  } else if(param.part == "uniform_l_shape_full_support__") {
      return aluminium_extrusion_bracket("L", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DeepSkyBlue", false);
  } else if(param.part == "short_t_shape_none_support__") {
      return aluminium_extrusion_bracket("T", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false);
  } else if(param.part == "short_t_shape_half_support__") {
      return aluminium_extrusion_bracket("T", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false);
  } else if(param.part == "short_t_shape_full_support__") {
      return aluminium_extrusion_bracket("T", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "HotPink", false);
  } else if(param.part == "uniform_t_shape_none_support__") {
      return aluminium_extrusion_bracket("T", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false);
  } else if(param.part == "uniform_t_shape_half_support__") {
      return aluminium_extrusion_bracket("T", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false);
  } else if(param.part == "uniform_t_shape_full_support__") {
      return aluminium_extrusion_bracket("T", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "DarkOrange", false);
  } else if(param.part == "short_x_shape_none_support__") {
      return aluminium_extrusion_bracket("X", "short", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false);
  } else if(param.part == "short_x_shape_half_support__") {
      return aluminium_extrusion_bracket("X", "short", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false);
  } else if(param.part == "short_x_shape_full_support__") {
      return aluminium_extrusion_bracket("X", "short", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "Gold", false);
  } else if(param.part == "uniform_x_shape_none_support__") {
      return aluminium_extrusion_bracket("X", "uniform", "none", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false);
  } else if(param.part == "uniform_x_shape_half_support__") {
      return aluminium_extrusion_bracket("X", "uniform", "half", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false);
  } else if(param.part == "uniform_x_shape_full_support__") {
      return aluminium_extrusion_bracket("X", "uniform", "full", w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes, "MediumPurple", false);
  } else {
      return all_parts(w, l, h, rails, hole_d, hole_offset_d, hole_offset_h, holes);
  }
}
