const data = {
    products: [
        {
            "id": 10,
            "name": "OpenJSCAD.org Logo",
            "description": "Official openjscad logo",
            "file": "assets/products/logo.jscad",
            "image": "assets/products/logo.png",
            "tags": [
                "Logo",
                "Intersection",
                "Sphere",
                "Cube"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },

        {
            "id": 50,
            "name": "Gear",
            "description": "a simple gear",
            "file": "assets/products/gear.jscad",
            "image": "assets/products/gear.png",
            "tags": [
                "gear",
                "mechanical",
                "parametric",
                "3d printing"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 60,
            "name": "Name Plate",
            "description": "create your own name plate",
            "file": "assets/products/name_plate.jscad",
            "image": "assets/products/name_plate.png",
            "tags": [
                "usefull",
                "name plate",
                "customizable",
                "personalization"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 70,
            "name": "Spiral ball bearing chute",
            "description": "A stackable spiral chute for ball bearings.",
            "file": "assets/products/robinsonia/spirall_ball_bearing_chute.jscad",
            "url": "http://robinsonia.com/?tag=3d-printing",
            "image": "assets/products/robinsonia/spirall_ball_bearing_chute.png",
            "tags": [
                "spiral",
                "ball bearing",
                "chute",
                "stackable",
                "toy"
            ],
            "author": "Peter Robinson",
            "license": "None.  Free for all."
        },
        {
            "id": 80,
            "name": "hook",
            "description": "parametric S hook",
            "file": "assets/products/joostn/hook.jscad",
            "url": "https://www.thingiverse.com/thing:17625",
            "image": "assets/products/joostn/hook.png",
            "license": "https://creativecommons.org/licenses/by-sa/3.0/",
            "tags": [
                "hook",
                "s-hook",
                "parametric",
                "hardware",
                "hanging"
            ]
        },
        {
            "id": 90,
            "name": "extruder",
            "description": "3D printable direct drive extruder for 3D printers",
            "file": "assets/products/denisc/extruder.jscad",
            "url": "https://www.thingiverse.com/thing:716381",
            "image": "assets/products/denisc/extruder.png",
            "license": "http://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
            "tags": [
                "extruder",
                "3d printer",
                "direct drive",
                "mechanical"
            ]
        },
        {
            "id": 100,
            "name": "Pulley (OpenSCAD -> classic OpenJSCAD v1)",
            "description": "Parametric Pulley with multiple belt profiles",
            "file": "assets/products/pulley.jscad",
            "image": "assets/products/pulley.png",
            "tags": [
                "pulley",
                "3d printing",
                "mechanical",
                "hardware",
                "motor",
                "belt"
            ],
            "author": "converted for robby roboter",
            "license": "MIT"
        },
        {
            "id": 110,
            "name": "Customizable Keychain Tag",
            "description": "A customizable keychain tag with dual-sided text and border insets.",
            "file": "assets/products/keychain.jscad",
            "image": "assets/products/keychain.png",
            "license": "MIT License",
            "tags": [
                "keychain",
                "3d printing",
                "mechanical",
                "hardware"
            ],
            "author": "Antigravity"
        },
        {
            "id": 120,
            "name": "Customizable Extrusion Plate Brackets",
            "description": "Customizable plate brackets for aluminium extrusion profiles (Misumi 2020, 2040, 4040, etc.)",
            "file": "assets/products/extrusion_bracket.jscad",
            "image": "assets/products/extrusion_bracket.png",
            "tags": [
                "bracket",
                "extrusion",
                "3d printer",
                "frame",
                "hardware"
            ],
            "author": "Dennis Hofmann (mightynozzle), converted by Antigravity",
            "license": "Creative Commons - Attribution - Non-Commercial (CC BY-NC 3.0)"
        },
        {
            "id": 140,
            "name": "iPhone 4 Dock",
            "description": "iPhone 4 dock",
            "file": "assets/products/iphone4-case.jscad",
            "image": "assets/products/iphone4-case.png",
            "tags": [
                "iphone",
                "phone case",
                "mobile",
                "accessory"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 180,
            "name": "Simplex Vector Font",
            "description": "playing with vector font",
            "file": "assets/products/simplex.jscad",
            "image": "assets/products/simplex.png",
            "tags": [
                "simplex",
                "geometry",
                "shape",
                "3d model"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 190,
            "name": "Celtic Knot Ring",
            "description": "a Celtic knot ring",
            "file": "assets/products/celtic-knot-ring.jscad",
            "image": "assets/products/celtic-knot-ring.png",
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License",
            "tags": [
                "Catmull Spline"
            ]
        },
        {
            "id": 390,
            "name": "Lamp Shade",
            "description": "a lamp shade",
            "file": "assets/products/lamp-shade.jscad",
            "image": "assets/products/lamp-shade.png",
            "tags": [
                "lamp",
                "shade",
                "lighting",
                "home decor"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 430,
            "name": "Axis Coupler",
            "description": "a simple axis coupler",
            "file": "assets/products/axis-coupler.jscad",
            "image": "assets/products/axis-coupler.png",
            "tags": [
                "coupler",
                "shaft",
                "flexible",
                "mechanical",
                "robotics"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 470,
            "name": "Sphere",
            "description": "testing sphere() function",
            "file": "assets/products/sphere.jscad",
            "image": "assets/products/sphere.png",
            "tags": [
                "sphere",
                "geometry",
                "shape",
                "3d model"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 520,
            "name": "Torus()",
            "description": "testing torus() function",
            "file": "assets/products/torus.jscad",
            "image": "assets/products/torus.png",
            "tags": [
                "torus",
                "geometry",
                "donut",
                "shape"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 540,
            "name": "Stepper Motor",
            "description": "a simple stepper motor design",
            "file": "assets/products/stepper-motor.jscad",
            "image": "assets/products/stepper-motor.png",
            "tags": [
                "stepper motor",
                "motor",
                "electrical",
                "mechanical"
            ],
            "author": "Derrick Oswald",
            "license": "MIT License"
        },
        {
            "id": 560,
            "name": "OpenJSCAD.org Logo BIG",
            "description": "Large OpenJSCAD logo design",
            "file": "assets/products/logo_big.jscad",
            "image": "assets/products/logo_big.png",
            "tags": [
                "Logo",
                "Intersection",
                "Sphere",
                "Cube",
                "Big"
            ],
            "author": "Jeff Gay",
            "license": "MIT License"
        },
        {
            "id": 570,
            "name": "Rounded Cube",
            "description": "testing roundedCube() function",
            "file": "assets/products/rounded-cube.jscad",
            "image": "assets/products/rounded-cube.png",
            "tags": [
                "cube",
                "rounded",
                "shape",
                "geometry"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 580,
            "name": "Dodecahedron",
            "description": "testing dodecahedron() function",
            "file": "assets/products/dodecahedron.jscad",
            "image": "assets/products/dodecahedron.png",
            "tags": [
                "dodecahedron",
                "geometry",
                "polyhedron",
                "shape"
            ],
            "author": "OpenSCAD, adapted by Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 590,
            "name": "EASY_BOX_V1.0",
            "description": "Easy to print customizable storage box",
            "file": "assets/products/micmak/EASY_BOX_V1.0.jscad",
            "image": "assets/products/micmak/EASY_BOX_V1.0.png",
            "tags": [
                "box",
                "storage",
                "container",
                "easy"
            ]
        },
        {
            "id": 600,
            "name": "CNC Corner Cutout",
            "description": "CNC cutout design pattern",
            "file": "assets/products/cnc-cutout.jscad",
            "image": "assets/products/cnc-cutout.png",
            "tags": [
                "2d",
                "cnc"
            ],
            "author": "Jeff Gay",
            "license": "MIT License"
        },
        {
            "id": 620,
            "name": "World",
            "description": "a globe",
            "file": "assets/products/globe.jscad",
            "image": "assets/products/globe.png",
            "tags": [
                "globe",
                "earth",
                "world",
                "map"
            ],
            "author": "Derrick Oswald",
            "license": "Public Domain"
        },
        {
            "id": 630,
            "name": "Grille",
            "description": "a grille for...",
            "file": "assets/products/grille.jscad",
            "image": "assets/products/grille.png",
            "tags": [
                "grille",
                "grid",
                "pattern",
                "ventilation"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 640,
            "name": "Bunch of Cubes",
            "description": "creating 100 cubes in space ...",
            "file": "assets/products/bunch-cubes.jscad",
            "image": "assets/products/bunch-cubes.png",
            "tags": [
                "cubes",
                "geometry",
                "arrangement",
                "pattern"
            ],
            "author": "Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "id": 650,
            "name": "Umbilical Torus generator",
            "description": "adapted for OpenJSCAD.org by Rene K. Mueller",
            "file": "assets/products/umbilical_torus.jscad",
            "image": "assets/products/umbilical_torus.png",
            "tags": [
                "torus",
                "umbilical",
                "mathematical",
                "shape"
            ],
            "author": "Bruce Mueller",
            "license": "Creative Commons CC BY-SA"
        },
        {
            "id": 680,
            "name": "Servo Motor",
            "description": "a servo motor design",
            "file": "assets/products/servo.jscad",
            "image": "assets/products/servo.png",
            "tags": [
                "servo",
                "motor",
                "robotics",
                "electrical"
            ],
            "author": "Joost Nieuwenhuijse",
            "license": "MIT License"
        },
        {
            "id": 690,
            "name": "Balloons",
            "description": "multiple balloons, testing new parameters",
            "file": "assets/products/balloons.jscad",
            "image": "assets/products/balloons.png",
            "tags": [
                "balloons",
                "party",
                "decoration",
                "toy"
            ],
            "author": "Z3 Dev",
            "license": "MIT License"
        },
        {
            "id": 700,
            "name": "Polyhedron",
            "description": "testing polyhedron() function",
            "file": "assets/products/polyhedron.jscad",
            "image": "assets/products/polyhedron.png",
            "tags": [
                "polyhedron",
                "geometry",
                "shape",
                "3d model"
            ],
            "author": "OpenSCAD.org, adapted by Rene K. Mueller",
            "license": "MIT License"
        },
        {
            "file": "assets/products/center.jscad",
            "image": "assets/products/center.png",
            "name": "Center",
            "description": "testing all the different options of the OpenSCAD-like OpenJSCAD functions (aside of the strict object oriented approaches)",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 740
        },
        {
            "file": "assets/products/chain_hull.jscad",
            "image": "assets/products/chain_hull.png",
            "name": "Chain Hull",
            "description": "Whosa whatsis suggested \"Chain Hull\" as described at",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 750
        },
        {
            "file": "assets/products/colors.jscad",
            "image": "assets/products/colors.png",
            "name": "Colors",
            "description": "testing hull() function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "tags": [
                "RGB",
                "RGBA"
            ],
            "id": 760
        },
        {
            "file": "assets/products/expand.jscad",
            "image": "assets/products/expand.png",
            "name": "Expand",
            "description": "testing expand() function",
            "author": "OpenSCAD.org, adapted by Rene K. Mueller",
            "license": "MIT License",
            "id": 770
        },
        {
            "file": "assets/products/hull.jscad",
            "image": "assets/products/hull.png",
            "name": "Hull",
            "description": "testing hull() function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 780
        },
        {
            "file": "assets/products/linear_extrude.jscad",
            "image": "assets/products/linear_extrude.png",
            "name": "Linear Extrude",
            "description": "testing linear_extrude() function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 840
        },
        {
            "file": "assets/products/lookup.jscad",
            "image": "assets/products/lookup.png",
            "name": "Lookup",
            "description": "testing lookup() function",
            "author": "OpenSCAD.org, adapted by Rene K. Mueller",
            "id": 850
        },
        {
            "file": "assets/products/platonics/main.jscad",
            "image": "assets/products/platonics/main.png",
            "name": "Platonics",
            "description": "original an OpenSCAD.org code, adapted for OpenJSCAD.org and testing recursive include()",
            "author": "Willliam A. Adams, Rene K. Mueller",
            "license": "Public Domain",
            "id": 860
        },
        {
            "file": "assets/products/primitives.jscad",
            "image": "assets/products/primitives.png",
            "name": "Primitives",
            "description": "testing primitives function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 890
        },
        {
            "file": "assets/products/rectangular_extrude.jscad",
            "image": "assets/products/rectangular_extrude.png",
            "name": "Rectangular Extrude",
            "description": "testing rectangular_extrude() function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 900
        },
        {
            "file": "assets/products/rotate_extrude.jscad",
            "image": "assets/products/rotate_extrude.png",
            "name": "Rotate Extrude",
            "description": "testing rotate_extrude() function",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 910
        },
        {
            "file": "assets/products/slices/double-screw.jscad",
            "image": "assets/products/slices/double-screw.png",
            "name": "Screw",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 920
        },
        {
            "file": "assets/products/slices/four2three-round.jscad",
            "image": "assets/products/slices/four2three-round.png",
            "name": "Four to three (sides)",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 930
        },
        {
            "file": "assets/products/slices/four2three.jscad",
            "image": "assets/products/slices/four2three.png",
            "name": "Four to three (sides)",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 940
        },
        {
            "file": "assets/products/slices/jar-barrel.jscad",
            "image": "assets/products/slices/jar-barrel.png",
            "name": "Jar barrel",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 950
        },
        {
            "file": "assets/products/slices/jar.jscad",
            "image": "assets/products/slices/jar.png",
            "name": "Jar",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 960
        },
        {
            "file": "assets/products/slices/non-aff.jscad",
            "image": "assets/products/slices/non-aff.png",
            "name": "Non Affine Transformation",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 970
        },
        {
            "file": "assets/products/slices/rose.jscad",
            "image": "assets/products/slices/rose.png",
            "name": "Rose Curve",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 980
        },
        {
            "file": "assets/products/slices/screw.jscad",
            "image": "assets/products/slices/screw.png",
            "name": "Screw",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 990
        },
        {
            "file": "assets/products/slices/slices.jscad",
            "image": "assets/products/slices/slices.png",
            "name": "Slices (single screw evolution)",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 1000
        },
        {
            "file": "assets/products/slices/spring.jscad",
            "image": "assets/products/slices/spring.png",
            "name": "Spring",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 1010
        },
        {
            "file": "assets/products/slices/three2four.jscad",
            "image": "assets/products/slices/three2four.png",
            "name": "Three to four (sides)",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 1020
        },
        {
            "file": "assets/products/slices/tor.jscad",
            "image": "assets/products/slices/tor.png",
            "name": "Tor (multi-color)",
            "description": "testing solidFromSlices()",
            "author": "Eduard Bespalov",
            "license": "MIT License",
            "id": 1030
        },
        {
            "file": "assets/products/text.jscad",
            "image": "assets/products/text.png",
            "name": "Vector Text Rendering",
            "description": "playing with vector font",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 1040
        },
        {
            "file": "assets/products/transformations.jscad",
            "image": "assets/products/transformations.png",
            "name": "transformations",
            "description": "all the different transforms operations",
            "author": "Mark Moissette",
            "license": "MIT License",
            "id": 1050
        },
        {
            "file": "assets/products/transparency.jscad",
            "image": "assets/products/transparency.png",
            "name": "Transparency",
            "description": "showing transparent objects",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 1060
        },
        {
            "file": "assets/products/transparency2.jscad",
            "image": "assets/products/transparency2.png",
            "name": "Transparency 2",
            "description": "showing transparent objects",
            "author": "Rene K. Mueller",
            "license": "MIT License",
            "id": 1070
        },
        {
            "file": "assets/products/extrusion_profile.jscad",
            "image": "assets/products/extrusion_profile.png",
            "name": "Customizable Extrusion Profiles",
            "description": "Parametric T-Slot and V-Slot extrusion profiles (10x10, 20x20, 20x40, etc.)",
            "author": "Antigravity",
            "license": "MIT License",
            "tags": [
                "extrusion",
                "t-slot",
                "v-slot",
                "hardware",
                "mechanical",
                "parametric",
                "3d printer"
            ],
            "id": 1080
        },
        {
            "file": "assets/products/drill_stand.jscad",
            "image": "assets/products/drill_stand.png",
            "name": "Parametric Drill and Hex-Bit Stand",
            "description": "Customizable stand for drill bits and hex bits with variable rows and hole shapes",
            "author": "Antigravity",
            "license": "MIT License",
            "tags": [
                "drill",
                "hex bit",
                "stand",
                "tool holder",
                "organizer",
                "parametric",
                "3d printing"
            ],
            "id": 1090
        },
        {
            "file": "assets/products/include-subfolder/main.jscad",
            "image": "assets/products/include-subfolder/main.png",
            "name": "main",
            "id": 1100
        },
        {
            "file": "assets/products/include-subfolder/sub/subModule.jscad",
            "image": "assets/products/include-subfolder/sub/subModule.png",
            "name": "subModule",
            "id": 1110
        },
        {
            "file": "assets/products/include-test/a01.jscad",
            "image": "assets/products/include-test/a01.png",
            "name": "a01",
            "id": 1120
        },
        {
            "file": "assets/products/include-test/a02.jscad",
            "image": "assets/products/include-test/a02.png",
            "name": "a02",
            "id": 1130
        },
        {
            "file": "assets/products/include-test/main.jscad",
            "image": "assets/products/include-test/main.png",
            "name": "main",
            "id": 1140
        }
    ]
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