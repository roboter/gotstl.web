import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../core';
import { ProductService } from '../products/product.service';

// @ts-ignore
import * as gProcessor from '@jwc/jscad-web';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],

  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  editingProduct!: Product;
  public outputFile!: string;
  public gProcessor: any = null;
  takeScreenshotAfterRender = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const viewerDiv = document.getElementById('viewerContext');
    const parameterstable = document.getElementById('parameterstable');

    let debounceTimer: any;
    const triggerUpdate = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.onUpdate();
      }, 150);
    };

    const triggerUpdateOnInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && (target.type === 'text' || target.type === 'number')) {
        return; // Wait for the 'change' event (blur) for text inputs
      }
      triggerUpdate();
    };

    parameterstable?.addEventListener('input', triggerUpdateOnInput);
    parameterstable?.addEventListener('change', triggerUpdate);

    if (this.activatedRoute.snapshot.queryParams.screenshot === 'true') {
      this.takeScreenshotAfterRender = true;
    }

    this.gProcessor = new gProcessor(viewerDiv, {
      drawLines: true,
      drawFaces: true,
      viewer: {
        camera: {
          clip: { min: 0.1, max: 100000 }
        },
        glOptions: {
          preserveDrawingBuffer: true,
        }
      },
      processor: {
        viewerdiv: viewerDiv,
        setStatus: (e: any, e1: any) => {},
        onUpdate: (e: any, e1: any) => {
          if (e.outputFile) {
            this.outputFile = e.outputFile.data;
          }
          if (this.takeScreenshotAfterRender) {
            if ((this as any).screenshotTimer) clearTimeout((this as any).screenshotTimer);
            (this as any).screenshotTimer = setTimeout(() => {
              this.takeScreenshotAfterRender = false;
              const processorInstance = this.gProcessor!.processor;
              if (!processorInstance || !processorInstance.viewedObject) return;
              
              const viewer = this.gProcessor!.viewer;
              if (viewer) {
                let minX = -10, maxX = 10;
                let minY = -10, maxY = 10;
                let minZ = -10, maxZ = 10;

                if (processorInstance && processorInstance.viewedObject) {
                  const viewed = processorInstance.viewedObject;
                  const solids = Array.isArray(viewed) ? viewed : [viewed];
                  let hasBounds = false;
                  solids.forEach((solid) => {
                    if (solid && typeof solid.getBounds === 'function') {
                      const bounds = solid.getBounds();
                      if (bounds && bounds.length === 2 && bounds[0] && bounds[1]) {
                        if (!hasBounds) {
                          minX = bounds[0].x; maxX = bounds[1].x;
                          minY = bounds[0].y; maxY = bounds[1].y;
                          minZ = bounds[0].z; maxZ = bounds[1].z;
                          hasBounds = true;
                        } else {
                          minX = Math.min(minX, bounds[0].x);
                          maxX = Math.max(maxX, bounds[1].x);
                          minY = Math.min(minY, bounds[0].y);
                          maxY = Math.max(maxY, bounds[1].y);
                          minZ = Math.min(minZ, bounds[0].z);
                          maxZ = Math.max(maxZ, bounds[1].z);
                        }
                      }
                    }
                  });
                }

                const dx = maxX - minX;
                const dy = maxY - minY;
                const dz = maxZ - minZ;
                const maxDim = Math.max(dx, dy, dz);
                const diagonal = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const cx = (minX + maxX) / 2;
                const cy = (minY + maxY) / 2;
                const cz = (minZ + maxZ) / 2;

                // Default camera angles
                const ax = -60 * Math.PI / 180;
                const az = -45 * Math.PI / 180;

                // Project center into camera's local coordinate system (R = Rx * Rz)
                const x1 = cx * Math.cos(az) - cy * Math.sin(az);
                const y1 = cx * Math.sin(az) + cy * Math.cos(az);
                const z1 = cz;

                const x2 = x1;
                const y2 = y1 * Math.cos(ax) - z1 * Math.sin(ax);

                // Position camera targeting the center of the object
                viewer.viewpointX = -x2;
                viewer.viewpointY = -y2;
                
                // Read zoomScale parameter (default: 1.0)
                const zoomScale = parseFloat(this.activatedRoute.snapshot.queryParams.zoomScale || '1.0');
                const fitToView = this.activatedRoute.snapshot.queryParams.fitToView === 'true';
                
                if (fitToView) {
                  // FOV is 45 degrees, which is Math.PI/4 radians. 
                  // Math.sin(22.5 deg) is ~0.38268. We'll use 1.35 * diagonal to nicely fit the sphere.
                  viewer.viewpointZ = (diagonal * 1.35) / zoomScale;
                } else {
                  // Adjust zoom distance dynamically based on diagonal and dimensions
                  // Safe fit for tall objects: diagonal * 3.2 or maxDim * 4.5, minimum fallback of 90
                  viewer.viewpointZ = Math.max(diagonal * 3.2, maxDim * 4.5, 90) / zoomScale;
                }

                viewer.angleX = -60;
                viewer.angleY = 0;
                viewer.angleZ = -45;
                viewer.onDraw();

                // Wait for the browser to render the frame, then flag Puppeteer
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    const debugDiv = document.createElement('div');
                    debugDiv.id = 'screenshot-ready-flag';
                    document.body.appendChild(debugDiv);
                  });
                });
              }
            }, 3000);
          }
        },
        parameterstable: parameterstable,
      },
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      const exampleFile = queryParams.file;
      const loadDesign = (product: Product) => {
        this.editingProduct = product;
        const design = this.editingProduct.file;
        const headers = new HttpHeaders().set(
          'Content-Type',
          'text/plain; charset=utf-8',
        );

        viewerDiv?.setAttribute('design-url', this.editingProduct.file);
        this.http
          .get(design, { headers, responseType: 'text' })
          .subscribe((res: string) => {
            this.editingProduct = product;

            this.editingProduct.code = res;
            this.onUpdate();
          });
      };

      if (exampleFile) {
        loadDesign({
          id: 0,
          name: queryParams.name || params.id || 'JSCAD example',
          description: queryParams.description || '',
          image: '',
          file: exampleFile,
          code: '',
          url: '',
        });
        return;
      }

      this.productService.getById(params.id).subscribe(loadDesign);
    });
  }

  onUpdate() {
    let jscadCode = this.editingProduct.code;
    
    // Polyfill to make OpenJSCAD's linear_extrude behave more like OpenSCAD by 
    // dynamically calculating slices based on twist if slices is not explicitly provided.
    const polyfill = `
      if (typeof linear_extrude !== 'undefined' && typeof _original_linear_extrude === 'undefined') {
        var _original_linear_extrude = linear_extrude;
        linear_extrude = function(params, baseShape) {
          if (params && typeof params === 'object' && params.twist !== undefined && params.slices === undefined) {
            params.slices = Math.max(10, Math.ceil(Math.abs(params.twist) / 5));
          }
          return _original_linear_extrude(params, baseShape);
        };
      }
    `;

    this.gProcessor!.setJsCad(polyfill + jscadCode);
    this.gProcessor!.rebuildSolids();
    setTimeout(() => {
      if (
        this.gProcessor &&
        this.gProcessor!.viewer &&
        typeof this.gProcessor!.viewer.handleResize === 'function'
      ) {
        this.gProcessor!.viewer.handleResize();
      }
    }, 100);
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  generateOutputFile() {
    this.gProcessor!.generateOutputFile({
      name: 'stl',
      displayName: 'STL (Binary)',
      description: 'STereoLithography, Binary',
      extension: 'stl',
      mimetype: 'application/sla',
      convertCSG: true,
      convertCAG: false,
    });
  }
}
