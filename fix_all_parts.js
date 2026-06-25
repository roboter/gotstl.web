const fs = require('fs');
let code = fs.readFileSync('src/assets/products/extrusion_bracket.jscad', 'utf8');

code = code.replace("return union(parts.map(function(part) {", "return union(parts.map(function(part) {");
code = code.replace("  }));\n}", "  })).scale([0.2, 0.2, 0.2]);\n}");

fs.writeFileSync('src/assets/products/extrusion_bracket.jscad', code);
