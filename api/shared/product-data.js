const data = {
  products: [
    {
      id: 10,
      name: 'logo',
      description: 'Official openjscad logo',
      file: 'assets/products/logo.jscad',
      image: 'assets/products/logo.png',
      tags: ['logo', 'official', 'openjscad']
    },
    {
      id: 30,
      name: 'echo',
      description: '3D echo shape model',
      file: 'assets/products/echo.jscad',
      image: 'assets/products/echo.png',
      tags: ['echo', '3d model', 'shape']
    },
    {
      id: 50,
      name: 'gear',
      description: 'Parametric gear design for 3D printing',
      file: 'assets/products/gear.jscad',
      image: 'assets/products/gear.png',
      tags: ['gear', 'mechanical', 'parametric', '3d printing']
    },
    {
      id: 60,
      name: 'name_plate',
      description: 'Customizable name plate for personalization',
      file: 'assets/products/name_plate.jscad',
      image: 'assets/products/name_plate.png',
      tags: ['usefull', 'name plate', 'customizable', 'personalization']
    },
    {
      id: 70,
      name: 'Spiral ball bearing chute',
      description: 'A stackable spiral chute for ball bearings.',
      file: 'assets/products/robinsonia/spirall_ball_bearing_chute.jscad',
      url: 'http://robinsonia.com/?tag=3d-printing',
      image: 'assets/products/robinsonia/ball-chute-212x300.jpg',
      tags: ['spiral', 'ball bearing', 'chute', 'stackable', 'toy']
    },
    {
      id: 80,
      name: 'S Hook',
      description: 'parametric S hook',
      file: 'assets/products/joostn/hook.jscad',
      url: 'https://www.thingiverse.com/thing:17625',
      image: 'assets/products/joostn/hook.png',
      license: 'https://creativecommons.org/licenses/by-sa/3.0/',
      tags: ['hook', 's-hook', 'parametric', 'hardware', 'hanging']
    },
    {
      id: 90,
      name: 'Interactive direct drive extruder',
      description: '3D printable direct drive extruder for 3D printers',
      file: 'assets/products/denisc/extruder.jscad',
      url: 'https://www.thingiverse.com/thing:716381',
      image: 'assets/products/denisc/extruder.jpg',
      license: 'http://www.gnu.org/licenses/old-licenses/gpl-2.0.html',
      tags: ['extruder', '3d printer', 'direct drive', 'mechanical']
    },
    {
      id: 100,
      name: 'pulley',
      description: 'A 3D printable pulley for 3D printers',
      file: 'assets/products/pulley.jscad',
      image: 'assets/products/pulley.png',
      tags: ['pulley', '3d printing', 'mechanical', 'hardware', 'motor', 'belt']
    },
    {
      id: 110,
      name: 'keychain',
      description: 'A customizable keychain tag with dual-sided text and border insets.',
      file: 'assets/products/keychain.jscad',
      image: 'assets/products/keychain.png',
      license: 'https://creativecommons.org/licenses/by-sa/3.0/',
      tags: ['keychain', '3d printing', 'mechanical', 'hardware']
    },
    {
      id: 120,
      name: 'extrusion_bracket',
      description: 'Customizable Extrusion Plate Brackets for 3D printer frames',
      file: 'assets/products/extrusion_bracket.jscad',
      image: 'assets/products/extrusion_bracket.png',
      tags: ['bracket', 'extrusion', '3d printer', 'frame', 'hardware']
    },
    {
      id: 140,
      name: 'iphone4-case',
      description: 'Customizable iPhone 4 case design',
      file: 'assets/products/iphone4-case.jscad',
      image: 'assets/products/iphone4-case.png',
      tags: ['iphone', 'phone case', 'mobile', 'accessory']
    },
    {
      id: 180,
      name: 'simplex',
      description: 'Simplex geometric shape model',
      file: 'assets/products/simplex.jscad',
      image: 'assets/products/simplex.png',
      tags: ['simplex', 'geometry', 'shape', '3d model']
    },
    {
      id: 190,
      name: 'celtic-knot-ring',
      description: 'a Celtic knot ring',
      file: 'assets/products/celtic-knot-ring.jscad',
      image: 'assets/products/celtic-knot-ring.png',
      author: 'Joost Nieuwenhuijse',
      license: 'https://creativecommons.org/licenses/by-sa/3.0/',
      tags: ['Catmull Spline', 'celtic', 'knot', 'ring', 'jewelry']
    },
    {
      id: 390,
      name: 'lamp-shade',
      description: '3D printable lamp shade design',
      file: 'assets/products/lamp-shade.jscad',
      image: 'assets/products/lamp-shade.png',
      tags: ['lamp', 'shade', 'lighting', 'home decor']
    },
    {
      id: 430,
      name: 'axis-coupler',
      description: 'Flexible shaft coupler for 3D printers and robotics',
      file: 'assets/products/axis-coupler.jscad',
      image: 'assets/products/axis-coupler.png',
      tags: ['coupler', 'shaft', 'flexible', 'mechanical', 'robotics']
    },
    {
      id: 470,
      name: 'sphere',
      description: '3D sphere geometric shape',
      file: 'assets/products/sphere.jscad',
      image: 'assets/products/sphere.png',
      tags: ['sphere', 'geometry', 'shape', '3d model']
    },
    {
      id: 520,
      name: 'torus',
      description: '3D torus geometric shape (donut)',
      file: 'assets/products/torus.jscad',
      image: 'assets/products/torus.png',
      tags: ['torus', 'geometry', 'donut', 'shape']
    },
    {
      id: 540,
      name: 'stepper-motor',
      description: '3D model of a stepper motor for visualization',
      file: 'assets/products/stepper-motor.jscad',
      image: 'assets/products/stepper-motor.png',
      tags: ['stepper motor', 'motor', 'electrical', 'mechanical']
    },
    {
      id: 560,
      name: 'logo_big',
      description: 'Large OpenJSCAD logo design',
      file: 'assets/products/logo_big.jscad',
      image: 'assets/products/logo_big.png',
      tags: ['logo', 'openjscad', 'large', 'branding']
    },
    {
      id: 570,
      name: 'rounded-cube',
      description: 'Cube with rounded edges and corners',
      file: 'assets/products/rounded-cube.jscad',
      image: 'assets/products/rounded-cube.png',
      tags: ['cube', 'rounded', 'shape', 'geometry']
    },
    {
      id: 580,
      name: 'dodecahedron',
      description: '3D dodecahedron geometric shape',
      file: 'assets/products/dodecahedron.jscad',
      image: 'assets/products/dodecahedron.png',
      tags: ['dodecahedron', 'geometry', 'polyhedron', 'shape']
    },
    {
      id: 590,
      name: 'EASY_BOX_V1.0',
      description: 'Easy to print customizable storage box',
      file: 'assets/products/micmak/EASY_BOX_V1.0.jscad',
      image: 'assets/products/micmak/EASY_BOX_V1.0.png',
      tags: ['box', 'storage', 'container', 'easy']
    },
    {
      id: 600,
      name: 'cnc-cutout',
      description: 'CNC cutout design pattern',
      file: 'assets/products/cnc-cutout.jscad',
      image: 'assets/products/cnc-cutout.png',
      tags: ['cnc', 'cutout', 'pattern', 'woodworking']
    },
    {
      id: 620,
      name: 'globe',
      description: '3D globe Earth model',
      file: 'assets/products/globe.jscad',
      image: 'assets/products/globe.png',
      tags: ['globe', 'earth', 'world', 'map']
    },
    {
      id: 630,
      name: 'grille',
      description: '3D grille or grid pattern design',
      file: 'assets/products/grille.jscad',
      image: 'assets/products/grille.png',
      tags: ['grille', 'grid', 'pattern', 'ventilation']
    },
    {
      id: 640,
      name: 'bunch-cubes',
      description: 'Collection of cubes in a geometric arrangement',
      file: 'assets/products/bunch-cubes.jscad',
      image: 'assets/products/bunch-cubes.png',
      tags: ['cubes', 'geometry', 'arrangement', 'pattern']
    },
    {
      id: 650,
      name: 'umbilical_torus',
      description: 'Umbilical torus mathematical shape',
      file: 'assets/products/umbilical_torus.jscad',
      image: 'assets/products/umbilical_torus.png',
      tags: ['torus', 'umbilical', 'mathematical', 'shape']
    },
    {
      id: 680,
      name: 'servo',
      description: '3D model of a servo motor',
      file: 'assets/products/servo.jscad',
      image: 'assets/products/servo.png',
      tags: ['servo', 'motor', 'robotics', 'electrical']
    },
    {
      id: 690,
      name: 'balloons',
      description: '3D balloon model design',
      file: 'assets/products/balloons.jscad',
      image: 'assets/products/balloons.png',
      tags: ['balloons', 'party', 'decoration', 'toy']
    },
    {
      id: 700,
      name: 'polyhedron',
      description: '3D polyhedron geometric shape',
      file: 'assets/products/polyhedron.jscad',
      image: 'assets/products/polyhedron.png',
      tags: ['polyhedron', 'geometry', 'shape', '3d model']
    },
  ],
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addProduct = (product) => {
  product.id = getRandomInt();
  data.products.push(product);
  return product;
};

const updateProduct = (product) => {
  const index = data.products.findIndex((v) => v.id === product.id);
  console.log(product);
  data.products.splice(index, 1, product);
  return product;
};

const deleteProduct = (id) => {
  const value = parseInt(id, 10);
  data.products = data.products.filter((v) => v.id !== value);
  return true;
};

const getProducts = () => {
  return data.products;
};

const getProduct = (id) => {
  const value = parseInt(id, 10);
  const index = data.products.findIndex((v) => v.id === value);
  return data.products[index];
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
};