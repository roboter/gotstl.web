import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="container guide-container">
      <!-- Premium Hero Section -->
      <div class="hero-gradient">
        <div class="hero-content">
          <p class="hero-eyebrow">Parametric STL Modeling</p>
          <h1 class="hero-title">GotSTL & OpenJSCAD</h1>
          <p class="hero-lead">
            Build reusable 3D models with JavaScript, tune dimensions in the browser, and export print-ready STL files.
          </p>
          <div class="is-divider-accent"></div>
          <p class="hero-copy">
            GotSTL pairs a curated model gallery with <strong>OpenJSCAD</strong>, a browser-native geometry engine that turns code into precise 3D parts.
            Define shapes mathematically, expose the important dimensions as parameters, and generate model variations instantly.
          </p>

          <div class="hero-pill-grid">
            <span><i class="fa fa-code" aria-hidden="true"></i> Script-driven CAD</span>
            <span><i class="fa fa-sliders" aria-hidden="true"></i> Parametric controls</span>
            <span><i class="fa fa-download" aria-hidden="true"></i> STL export</span>
          </div>
        </div>

        <div class="hero-visual" aria-label="Rendered OpenJSCAD model previews">
          <div class="hero-visual-header">
            <span class="status-dot"></span>
            <span>Live geometry preview</span>
          </div>
          <div class="hero-preview-grid">
            <div class="hero-model-card model-card-large">
              <img src="assets/examples/extrusion_bracket.png" alt="Extrusion bracket rendering">
            </div>
            <div class="hero-model-card">
              <img src="assets/examples/gear.png" alt="Gear rendering">
            </div>
            <div class="hero-model-card">
              <img src="assets/examples/logo.png" alt="OpenJSCAD logo rendering">
            </div>
          </div>
          <div class="hero-code-panel">
            <code>width = 60</code>
            <code>holes = 4</code>
            <code>export: STL</code>
          </div>
        </div>
      </div>

      <!-- Video Section -->
      <div class="card video-card mb-6">
        <div class="card-content">
          <div class="content-title-group mb-4">
            <h2 class="title is-3">Video Introduction</h2>
          </div>
          <div class="video-frame">
            <iframe
              src="https://www.youtube.com/embed/T9IfF_1Y4z8"
              title="GotSTL OpenJSCAD video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          </div>
        </div>
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

      <!-- OpenJSCAD User Guide Summary -->
      <div class="guide-reference-section mb-6">
        <div class="content-title-group mb-4">
          <h2 class="title is-3">OpenJSCAD User Guide</h2>
          <p class="subtitle is-6">
            A practical summary of the Wikibooks guide for using OpenJSCAD in the browser, locally, and from scripts.
          </p>
        </div>

        <div class="guide-topic-grid">
          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-window-maximize" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">Use It in the Browser</h3>
            <p>
              OpenJSCAD provides a viewer and editor for loading <code>.jscad</code> files, editing scripts, and previewing models.
              It supports browser workflows such as drag-and-drop loading and auto reload while editing files externally.
            </p>
          </div>

          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-terminal" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">Run It Locally</h3>
            <p>
              Projects can run offline from a local installation or from the command line. The CLI can render scripts and export common formats,
              including STL, AMF, DXF, and converted JSCAD output.
            </p>
          </div>

          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-file-code-o" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">Script Anatomy</h3>
            <p>
              A model starts with <code>main()</code>, which returns one solid or an array of separate solids. Geometry is built with JavaScript
              functions, so reusable helpers and parameter-driven designs fit naturally.
            </p>
          </div>

          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-cube" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">3D Modeling Tools</h3>
            <p>
              Core solids include boxes, spheres, cylinders, tori, polyhedra, and text. Transformations such as scale, rotate, translate,
              mirror, center, union, intersection, and difference shape those primitives into printable parts.
            </p>
          </div>

          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-object-group" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">2D to 3D Workflows</h3>
            <p>
              Circles, rectangles, polygons, and paths can be transformed in 2D, then converted into solid geometry with linear,
              rectangular, or rotational extrusion.
            </p>
          </div>

          <div class="guide-topic-card">
            <div class="guide-topic-icon"><i class="fa fa-folder-open-o" aria-hidden="true"></i></div>
            <h3 class="title is-5 mb-2">Larger Projects</h3>
            <p>
              Bigger designs can be split across files, organized as project folders, and built with reusable modules. That makes scripted CAD
              easier to maintain as models grow beyond a single file.
            </p>
          </div>
        </div>

        <div class="guide-reference-footer">
          <a href="https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#OpenJSCAD_Programming_Guide" target="_blank" class="has-text-weight-bold">
            <span class="icon is-small mr-1"><i class="fa fa-book" aria-hidden="true"></i></span>
            <span>Read the full OpenJSCAD Wikibooks guide</span>
          </a>
        </div>
      </div>

      <!-- Primitive Renderings -->
      <div class="content-title-group mb-5">
        <h2 class="title is-3">Primitive Renderings</h2>
      </div>

      <div class="primitive-grid mb-6">
        <div class="primitive-card">
          <div class="primitive-rendering">
            <svg viewBox="0 0 180 140" role="img" aria-label="Cube primitive rendering">
              <defs>
                <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#93c5fd" />
                  <stop offset="100%" stop-color="#3b82f6" />
                </linearGradient>
                <linearGradient id="cubeSide" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#1d4ed8" />
                  <stop offset="100%" stop-color="#1e3a8a" />
                </linearGradient>
              </defs>
              <polygon points="50,45 95,20 140,45 95,70" fill="url(#cubeTop)" />
              <polygon points="50,45 95,70 95,120 50,95" fill="#2563eb" />
              <polygon points="95,70 140,45 140,95 95,120" fill="url(#cubeSide)" />
            </svg>
          </div>
          <h3 class="title is-5 mb-2">Cube</h3>
          <p><code>cube()</code> creates boxes, plates, brackets, and other rectangular solids.</p>
        </div>

        <div class="primitive-card">
          <div class="primitive-rendering">
            <svg viewBox="0 0 180 140" role="img" aria-label="Sphere primitive rendering">
              <defs>
                <radialGradient id="sphereShade" cx="38%" cy="30%" r="68%">
                  <stop offset="0%" stop-color="#bfdbfe" />
                  <stop offset="45%" stop-color="#3b82f6" />
                  <stop offset="100%" stop-color="#1e3a8a" />
                </radialGradient>
              </defs>
              <circle cx="90" cy="70" r="48" fill="url(#sphereShade)" />
              <ellipse cx="90" cy="96" rx="38" ry="8" fill="#0f172a" opacity="0.18" />
            </svg>
          </div>
          <h3 class="title is-5 mb-2">Sphere</h3>
          <p><code>sphere()</code> builds rounded caps, ball joints, knobs, and smooth surfaces.</p>
        </div>

        <div class="primitive-card">
          <div class="primitive-rendering">
            <svg viewBox="0 0 180 140" role="img" aria-label="Cylinder primitive rendering">
              <defs>
                <linearGradient id="cylinderBody" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#1e40af" />
                  <stop offset="50%" stop-color="#60a5fa" />
                  <stop offset="100%" stop-color="#1d4ed8" />
                </linearGradient>
              </defs>
              <rect x="48" y="38" width="84" height="64" fill="url(#cylinderBody)" />
              <ellipse cx="90" cy="38" rx="42" ry="16" fill="#93c5fd" />
              <path d="M48 102 C48 110 132 110 132 102" fill="#1d4ed8" />
              <ellipse cx="90" cy="102" rx="42" ry="16" fill="#1e3a8a" opacity="0.35" />
            </svg>
          </div>
          <h3 class="title is-5 mb-2">Cylinder</h3>
          <p><code>cylinder()</code> is used for holes, posts, bushings, shafts, and round bosses.</p>
        </div>

        <div class="primitive-card">
          <div class="primitive-rendering">
            <svg viewBox="0 0 180 140" role="img" aria-label="Torus primitive rendering">
              <defs>
                <radialGradient id="torusShade" cx="42%" cy="30%" r="70%">
                  <stop offset="0%" stop-color="#bfdbfe" />
                  <stop offset="52%" stop-color="#3b82f6" />
                  <stop offset="100%" stop-color="#1e3a8a" />
                </radialGradient>
              </defs>
              <ellipse cx="90" cy="70" rx="58" ry="40" fill="url(#torusShade)" />
              <ellipse cx="90" cy="70" rx="28" ry="18" fill="#f8fafc" />
              <path d="M62 70 C62 55 118 55 118 70" fill="none" stroke="#1e3a8a" stroke-width="4" opacity="0.35" />
            </svg>
          </div>
          <h3 class="title is-5 mb-2">Torus</h3>
          <p><code>torus()</code> creates rings, gaskets, tire-like forms, and rounded loops.</p>
        </div>
      </div>

      <!-- Section Title -->
      <div class="content-title-group mb-4">
        <h2 class="title is-3">OpenJSCAD Modeling Examples</h2>
      </div>
      
      <p class="subtitle is-6 mb-5">
        Short, classic examples that open directly in the editor for hands-on exploration.
      </p>

      <!-- Examples Grid -->
      <div class="columns is-multiline modeling-examples">
        <!-- Example 1 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-light mb-2">example001.jscad</span>
              <h3 class="title is-4 mb-2">Sphere With Three Cutouts</h3>
              <p class="has-text-grey-darker mb-3">
                Start with a sphere, subtract three rotated cylinders, and inspect how CSG removes material.
              </p>
              <a class="button is-primary is-small" [routerLink]="['/product', 'example001']"
                [queryParams]="{ file: 'assets/examples/example001.jscad', name: 'Example 001' }">
                <span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span>Open in editor</span>
              </a>
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
              <span class="tag is-primary is-light mb-2">example002.jscad</span>
              <h3 class="title is-4 mb-2">Union, Difference, Intersection</h3>
              <p class="has-text-grey-darker mb-3">
                A compact demonstration of nested boolean operations using cubes and a tapered cylinder.
              </p>
              <a class="button is-primary is-small" [routerLink]="['/product', 'example002']"
                [queryParams]="{ file: 'assets/examples/example002.jscad', name: 'Example 002' }">
                <span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span>Open in editor</span>
              </a>
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
              <span class="tag is-primary is-light mb-2">example003.jscad</span>
              <h3 class="title is-4 mb-2">Cross-Shaped Solid</h3>
              <p class="has-text-grey-darker mb-3">
                Combine centered boxes into a balanced solid, then carve channels from each axis.
              </p>
              <a class="button is-primary is-small" [routerLink]="['/product', 'example003']"
                [queryParams]="{ file: 'assets/examples/example003.jscad', name: 'Example 003' }">
                <span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span>Open in editor</span>
              </a>
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
              <span class="tag is-primary is-light mb-2">example004.jscad</span>
              <h3 class="title is-4 mb-2">Cube Minus Sphere</h3>
              <p class="has-text-grey-darker mb-3">
                The simplest subtractive form: a centered cube with a rounded volume removed from it.
              </p>
              <a class="button is-primary is-small" [routerLink]="['/product', 'example004']"
                [queryParams]="{ file: 'assets/examples/example004.jscad', name: 'Example 004' }">
                <span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span>Open in editor</span>
              </a>
            </div>
            <div class="code-container">
              <button class="copy-button" (click)="copyToClipboard(example4, 'ex4')">
                {{ copiedMap['ex4'] ? '✅ Copied!' : '📋 Copy Code' }}
              </button>
              <pre><code>{{ example4 }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Example 5 -->
        <div class="column is-12 mb-5">
          <div class="card code-card">
            <div class="card-content-header">
              <span class="tag is-primary is-light mb-2">example005.jscad</span>
              <h3 class="title is-4 mb-2">Looped Cylinder Pattern</h3>
              <p class="has-text-grey-darker mb-3">
                Use a loop to place repeated cylinders around a circular body, then combine them into a larger assembly.
              </p>
              <a class="button is-primary is-small" [routerLink]="['/product', 'example005']"
                [queryParams]="{ file: 'assets/examples/example005.jscad', name: 'Example 005' }">
                <span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                <span>Open in editor</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="box mt-6 is-light-grey">
        <h3 class="title is-4 mb-3">Useful Resources</h3>
        <div class="columns is-multiline">
          <div class="column is-3">
            <div class="resource-link">
              <a href="https://openjscad.xyz/" target="_blank" class="has-text-weight-bold">
                <span class="icon is-small mr-1"><i class="fa fa-link" aria-hidden="true"></i></span>
                <span>Official JSCAD Website</span>
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">The main hub for OpenJSCAD versions, docs, and news.</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="resource-link">
              <a href="https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#OpenJSCAD_Programming_Guide" target="_blank" class="has-text-weight-bold">
                <span class="icon is-small mr-1"><i class="fa fa-book" aria-hidden="true"></i></span>
                <span>OpenJSCAD Wikibooks Guide</span>
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">A user and programming guide covering workflows, primitives, transforms, and projects.</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="resource-link">
              <a href="https://github.com/jscad/OpenJSCAD.org/wiki" target="_blank" class="has-text-weight-bold">
                <span class="icon is-small mr-1"><i class="fa fa-link" aria-hidden="true"></i></span>
                <span>OpenJSCAD Wiki & Source Code</span>
              </a>
              <p class="is-size-7 has-text-grey-dark mt-1">Access the community wiki, release timelines, and core repository.</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="resource-link">
              <a href="https://www.openjscad.xyz/forum.html" target="_blank" class="has-text-weight-bold">
                <span class="icon is-small mr-1"><i class="fa fa-link" aria-hidden="true"></i></span>
                <span>OpenJSCAD User Forum</span>
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
        max-width: 1180px;
      }
      .hero-gradient {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
        gap: 2.5rem;
        align-items: center;
        background:
          linear-gradient(135deg, rgba(181, 46, 49, 0.96) 0%, rgba(125, 28, 30, 0.94) 52%, rgba(30, 58, 138, 0.94) 100%),
          #7d1c1e;
        color: #ffffff;
        border-radius: 8px;
        padding: 4.5rem 3rem;
        margin-bottom: 3rem;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
        overflow: hidden;
      }
      .hero-content {
        max-width: 660px;
      }
      .hero-eyebrow {
        color: #fecaca;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
      }
      .hero-title {
        color: #ffffff;
        font-size: 3.4rem;
        font-weight: 800;
        line-height: 1.05;
        margin-bottom: 1rem;
      }
      .hero-lead {
        color: #f8fafc;
        font-size: 1.3rem;
        line-height: 1.45;
        margin-bottom: 1.5rem;
      }
      .hero-copy {
        color: #e2e8f0;
        font-size: 1rem;
        line-height: 1.7;
        margin-top: 1.25rem;
        max-width: 620px;
      }
      .hero-copy strong {
        color: #ffffff;
      }
      .hero-pill-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 1.75rem;
      }
      .hero-pill-grid span {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 999px;
        color: #ffffff;
        font-size: 0.9rem;
        font-weight: 600;
        padding: 0.5rem 0.8rem;
      }
      .hero-visual {
        background: rgba(255, 255, 255, 0.94);
        border: 1px solid rgba(255, 255, 255, 0.56);
        border-radius: 8px;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.28);
        color: #0f172a;
        padding: 1rem;
      }
      .hero-visual-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #334155;
        font-size: 0.82rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
      }
      .status-dot {
        width: 0.65rem;
        height: 0.65rem;
        background-color: #22c55e;
        border-radius: 999px;
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.14);
      }
      .hero-preview-grid {
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: 0.75rem;
      }
      .hero-model-card {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 128px;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        overflow: hidden;
        padding: 0.65rem;
      }
      .model-card-large {
        grid-row: span 2;
        min-height: 268px;
      }
      .hero-model-card img {
        display: block;
        width: 100%;
        height: 100%;
        max-height: 250px;
        object-fit: contain;
      }
      .hero-code-panel {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      .hero-code-panel code {
        background: #0f172a;
        border-radius: 4px;
        color: #bfdbfe;
        display: block;
        font-size: 0.78rem;
        padding: 0.55rem 0.6rem;
        text-align: center;
      }
      .is-divider-accent {
        height: 3px;
        width: 96px;
        background-color: #93c5fd;
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
      .video-card {
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      }
      .video-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: #0f172a;
        border-radius: 6px;
        overflow: hidden;
      }
      .video-frame iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .primitive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 1rem;
      }
      .guide-reference-section {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      }
      .guide-topic-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      .guide-topic-card {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1rem;
        background: #f8fafc;
      }
      .guide-topic-icon {
        align-items: center;
        background: #1e3a8a;
        border-radius: 6px;
        color: #ffffff;
        display: inline-flex;
        height: 2.25rem;
        justify-content: center;
        margin-bottom: 0.75rem;
        width: 2.25rem;
      }
      .guide-topic-card p {
        color: #475569;
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .guide-reference-footer {
        border-top: 1px solid #e2e8f0;
        margin-top: 1.25rem;
        padding-top: 1rem;
      }
      .primitive-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      }
      .primitive-rendering {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 150px;
        margin-bottom: 0.75rem;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 6px;
      }
      .primitive-rendering svg {
        width: 100%;
        max-width: 180px;
        height: auto;
      }
      .primitive-card p {
        color: #475569;
        font-size: 0.95rem;
      }
      .code-card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .modeling-examples {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        margin-left: 0;
        margin-right: 0;
      }
      .modeling-examples .column {
        margin-bottom: 0 !important;
        padding: 0;
        width: auto;
      }
      .modeling-examples .code-card {
        height: 100%;
      }
      .modeling-examples .card-content-header {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .modeling-examples .button {
        align-self: flex-start;
        margin-top: auto;
      }
      .modeling-examples .code-container {
        display: none;
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
      @media screen and (max-width: 900px) {
        .hero-gradient {
          grid-template-columns: 1fr;
          padding: 3rem 1.75rem;
        }
        .hero-title {
          font-size: 2.6rem;
        }
      }
      @media screen and (max-width: 560px) {
        .hero-gradient {
          padding: 2.25rem 1.25rem;
        }
        .hero-title {
          font-size: 2.1rem;
        }
        .hero-lead {
          font-size: 1.08rem;
        }
        .hero-preview-grid,
        .hero-code-panel {
          grid-template-columns: 1fr;
        }
        .model-card-large {
          grid-row: auto;
          min-height: 180px;
        }
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

