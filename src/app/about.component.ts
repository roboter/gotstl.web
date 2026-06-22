import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="container guide-container">
      <!-- Premium Hero Section -->
      <div class="hero-gradient">
        <h1 class="title is-2 has-text-white mb-2">GotSTL & OpenJSCAD</h1>
        <p class="subtitle is-5 has-text-grey-light mb-4">
          Empowering designers and engineers with script-driven, parametric 3D modeling.
        </p>
        <div class="is-divider-accent"></div>
        <p class="is-size-6 mt-3">
          This platform uses **OpenJSCAD**, a browser-based technology that transforms JavaScript code into 3D models.
          Define your geometries mathematically, parameterize key dimensions, and export ready-to-print STL files instantly.
        </p>
      </div>

      <!-- Overview Columns -->
      <div class="columns is-multiline mb-6">
        <div class="column is-6">
          <div class="card concept-card-blue">
            <header class="card-header bg-accent-dark">
              <p class="card-header-title has-text-white">
                <span class="icon mr-2"><i class="fa fa-code"></i></span>
                Why Code-Based CAD?
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>
                  Traditional CAD systems rely on point-and-click graphical interfaces. While intuitive, they make modifications slow and repetitive.
                </p>
                <p>
                  <strong>OpenJSCAD</strong> treats 3D models as code. By defining parameters (width, height, thickness) up front, you can generate hundreds of variations of a part in milliseconds by simply adjusting customizer inputs.
                </p>
                <ul>
                  <li><strong>Infinite Reusability:</strong> Create design templates once and adjust them forever.</li>
                  <li><strong>Version Control:</strong> Track changes to your 3D models using Git, just like code.</li>
                  <li><strong>Browser-Native:</strong> No installation or heavy downloads required; it runs locally in your browser.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="card concept-card-dark">
            <header class="card-header bg-primary">
              <p class="card-header-title has-text-white">
                <span class="icon mr-2"><i class="fa fa-cubes"></i></span>
                Core Concepts (CSG)
              </p>
            </header>
            <div class="card-content">
              <div class="content font-sm">
                <p>
                  OpenJSCAD uses <strong>Constructive Solid Geometry (CSG)</strong> to construct complex structures out of basic shapes:
                </p>
                <div class="concept-item">
                  <strong>1. Primitives:</strong> Basic geometric building blocks like <code>cube()</code>, <code>sphere()</code>, and <code>cylinder()</code>.
                </div>
                <div class="concept-item">
                  <strong>2. Transforms:</strong> Operations to position and size shapes: <code>translate([x,y,z])</code>, <code>rotate([x,y,z])</code>, and <code>scale([x,y,z])</code>.
                </div>
                <div class="concept-item">
                  <strong>3. Booleans:</strong> Combining solids mathematically:
                  <ul>
                    <li><code>union()</code> - merge shapes together</li>
                    <li><code>difference()</code> - subtract shapes from each other</li>
                    <li><code>intersection()</code> - keep only overlapping parts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Title -->
      <div class="content-title-group mb-5">
        <h2 class="title is-3">OpenJSCAD Modeling Examples</h2>
      </div>
      
      <p class="subtitle is-6 mb-5">
        Explore these practical, classic OpenJSCAD (v1) examples. Click copy and paste them directly into the custom model editor to try them out!
      </p>

      <!-- Examples Grid -->
      <div class="columns is-multiline">
        <!-- Example 1 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-rounded mb-2">Example 1</span>
              <h3 class="title is-4 mb-2">Basic CSG Assembly</h3>
              <p class="has-text-grey-darker mb-3">
                This example demonstrates how to create a basic plate and subtract a cylinder from it to create a mounting hole using the <code>difference()</code> operation.
              </p>
            </div>
            <div class="code-container">
              <button class="copy-button" (click)="copyToClipboard(example1, 'ex1')">
                {{ copiedMap['ex1'] ? '✅ Copied!' : '📋 Copy Code' }}
              </button>
              <pre><code>{{ example1 }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Example 2 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-rounded mb-2">Example 2</span>
              <h3 class="title is-4 mb-2">Parametric Customizer Inputs</h3>
              <p class="has-text-grey-darker mb-3">
                Learn how to declare customizer input fields (sliders, numeric inputs) using <code>getParameterDefinitions()</code>, and process them dynamically inside the <code>main()</code> function.
              </p>
            </div>
            <div class="code-container">
              <button class="copy-button" (click)="copyToClipboard(example2, 'ex2')">
                {{ copiedMap['ex2'] ? '✅ Copied!' : '📋 Copy Code' }}
              </button>
              <pre><code>{{ example2 }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Example 3 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-rounded mb-2">Example 3</span>
              <h3 class="title is-4 mb-2">2D Polygon Paths & Extrusions</h3>
              <p class="has-text-grey-darker mb-3">
                This demonstrates modeling a complex 2D custom path using coordinates with <code>polygon()</code> and extruding it into a twisted 3D model using <code>linear_extrude()</code>.
              </p>
            </div>
            <div class="code-container">
              <button class="copy-button" (click)="copyToClipboard(example3, 'ex3')">
                {{ copiedMap['ex3'] ? '✅ Copied!' : '📋 Copy Code' }}
              </button>
              <pre><code>{{ example3 }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Example 4 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-rounded mb-2">Example 4</span>
              <h3 class="title is-4 mb-2">Repetitive Patterns using Loops</h3>
              <p class="has-text-grey-darker mb-3">
                Rather than manually placing copies, use standard JavaScript <code>for</code> loops and basic trigonometry (<code>Math.cos</code> and <code>Math.sin</code>) to create circular patterns like flange bolt layouts.
              </p>
            </div>
            <div class="code-container">
              <button class="copy-button" (click)="copyToClipboard(example4, 'ex4')">
                {{ copiedMap['ex4'] ? '✅ Copied!' : '📋 Copy Code' }}
              </button>
              <pre><code>{{ example4 }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="box mt-6 is-light-grey">
        <h3 class="title is-4 mb-3">Useful Resources</h3>
        <div class="columns">
          <div class="column is-4">
            <div class="resource-link">
              <a href="https://openjscad.xyz/" target="_blank" class="has-text-weight-bold">
                🔗 Official JSCAD Website
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">The main hub for OpenJSCAD versions, docs, and news.</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="resource-link">
              <a href="https://github.com/jscad/OpenJSCAD.org/wiki" target="_blank" class="has-text-weight-bold">
                🔗 OpenJSCAD Wiki & Source Code
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">Access the community wiki, release timelines, and core repository.</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="resource-link">
              <a href="https://www.openjscad.xyz/forum.html" target="_blank" class="has-text-weight-bold">
                🔗 OpenJSCAD User Forum
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">Ask questions, share designs, and connect with other parametric modelers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .guide-container {
        padding: 2.5rem 1rem;
        max-width: 1012px;
      }
      .hero-gradient {
        background: linear-gradient(135deg, #b52e31 0%, #7d1c1e 100%);
        color: white;
        border-radius: 8px;
        padding: 3rem 2rem;
        margin-bottom: 2.5rem;
        box-shadow: 0 4px 15px rgba(181, 46, 49, 0.15);
      }
      .is-divider-accent {
        height: 3px;
        width: 80px;
        background-color: #fca5a5;
        border-radius: 2px;
      }
      .concept-card-blue {
        border-top: 4px solid #3b82f6;
        height: 100%;
      }
      .concept-card-dark {
        border-top: 4px solid #b52e31;
        height: 100%;
      }
      .bg-accent-dark {
        background-color: #1e3a8a;
      }
      .bg-primary {
        background-color: #7d1c1e;
      }
      .concept-item {
        margin-bottom: 0.75rem;
        padding-left: 0.5rem;
        border-left: 3px solid #b52e31;
      }
      .font-sm {
        font-size: 0.95rem;
      }
      .code-card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .card-content-header {
        padding: 1.5rem 1.5rem 1rem 1.5rem;
      }
      .code-container {
        position: relative;
        background-color: #1a202c;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
      }
      .code-container pre {
        background: transparent;
        color: #e2e8f0;
        margin: 0;
        padding: 1.5rem;
        font-family: 'Consolas', 'Courier New', Courier, monospace;
        font-size: 0.88rem;
        line-height: 1.5;
        overflow-x: auto;
      }
      .copy-button {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.35rem 0.75rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        z-index: 10;
        font-weight: 500;
      }
      .copy-button:hover {
        background-color: rgba(255, 255, 255, 0.28);
      }
      .is-light-grey {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
      }
      .resource-link {
        padding: 0.5rem;
      }
    `
  ]
})
export class AboutComponent {
  copiedMap: { [key: string]: boolean } = {};

  copyToClipboard(codeText: string, exampleId: string) {
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = codeText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeText)
        .then(() => {
          this.copiedMap[exampleId] = true;
          setTimeout(() => this.copiedMap[exampleId] = false, 1500);
        })
        .catch(() => {
          fallbackCopy();
          this.copiedMap[exampleId] = true;
          setTimeout(() => this.copiedMap[exampleId] = false, 1500);
        });
    } else {
      fallbackCopy();
      this.copiedMap[exampleId] = true;
      setTimeout(() => this.copiedMap[exampleId] = false, 1500);
    }
  }


  example1 = `// Example 1: Basic Bracket with Mounting Hole
function main() {
  // Create a base plate (30x30x5 mm)
  var plate = cube({size: [30, 30, 5], center: true});
  
  // Create a mounting hole (cylinder of radius 3 mm, height 10 mm)
  var hole = cylinder({r: 3, h: 10, center: true});
  
  // Subtract the hole from the plate using difference
  return difference(plate, hole);
}`;

  example2 = `// Example 2: Fully Parametric Rounded Plate
function getParameterDefinitions() {
  return [
    { name: 'width', type: 'number', initial: 40, caption: 'Width (mm)' },
    { name: 'length', type: 'number', initial: 60, caption: 'Length (mm)' },
    { name: 'height', type: 'number', initial: 8, caption: 'Height (mm)' },
    { name: 'radius', type: 'range', min: 2, max: 12, step: 0.5, initial: 6, caption: 'Corner Radius (mm)' }
  ];
}

function main(params) {
  var w = params.width;
  var l = params.length;
  var h = params.height;
  var r = params.radius;

  // Base cube
  var base = cube({size: [w, l, h], center: true});

  // Corner cylinders to subtract (using union to combine them)
  var cornersToCut = union(
    translate([-w/2, -l/2, 0], cylinder({r: r, h: h * 2, center: true})),
    translate([w/2, -l/2, 0], cylinder({r: r, h: h * 2, center: true})),
    translate([-w/2, l/2, 0], cylinder({r: r, h: h * 2, center: true})),
    translate([w/2, l/2, 0], cylinder({r: r, h: h * 2, center: true}))
  );

  return difference(base, cornersToCut);
}`;

  example3 = `// Example 3: Custom Star Extrusion with Twist
function main() {
  // Define 2D points for a simple star-like polygon shape
  var starPoints = [
    [0, 15],
    [4, 5],
    [14, 4],
    [6, -3],
    [9, -13],
    [0, -7],
    [-9, -13],
    [-6, -3],
    [-14, 4],
    [-4, 5]
  ];
  
  // Create 2D polygon shape
  var star2D = polygon({points: starPoints});
  
  // Extrude to 3D with height 20 mm, twisting 90 degrees
  return linear_extrude({height: 20, twist: 90, slices: 60}, star2D);
}`;

  example4 = `// Example 4: Circular Flange with Mounting Holes
function main() {
  var numHoles = 6;
  var ringRadius = 25;
  var holeRadius = 3;
  var thickness = 6;

  // Create the main flange body
  var flange = cylinder({r: 35, h: thickness, center: true});
  
  // Create a center bore hole
  var centerBore = cylinder({r: 10, h: thickness * 2, center: true});
  
  // Array to collect hole geometries
  var cutouts = [centerBore];

  // Distribute mounting holes around the center ring using a loop
  for (var i = 0; i < numHoles; i++) {
    var angle = (i * 2 * Math.PI) / numHoles;
    var x = ringRadius * Math.cos(angle);
    var y = ringRadius * Math.sin(angle);
    
    // Create hole cylinder, translate to circle path
    var hole = translate([x, y, 0], cylinder({r: holeRadius, h: thickness * 2, center: true}));
    cutouts.push(hole);
  }

  // Subtract all holes (bore + mounting holes) from flange body
  return difference(flange, union(cutouts));
}`;
}

