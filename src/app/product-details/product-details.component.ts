import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../core';
import { ProductService } from '../products/product.service';

import * as gProcessor from '@jwc/jscad-web';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  editingProduct: Product;
  public outputFile: string;
  public gProcessor = null;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const viewerDiv = document.getElementById('viewerContext');
    const parameterstable = document.getElementById('parameterstable');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.getById(params.id).subscribe((product) => {
        this.editingProduct = product;
        const design = this.editingProduct.file;
        const headers = new HttpHeaders().set(
          'Content-Type',
          'text/plain; charset=utf-8',
        );

        viewerDiv.setAttribute('design-url', this.editingProduct.file);
        this.http
          .get(design, { headers, responseType: 'text' })
          .subscribe((res: string) => {
            this.editingProduct = product;

            this.editingProduct.code = res;
            this.onUpdate();
          });
      });
    });

    this.gProcessor = new gProcessor(viewerDiv, {
      drawLines: true,
      drawFaces: true,
      processor: {
        viewerdiv: viewerDiv,
        setStatus: (e, e1) => {},
        onUpdate: (e, e1) => {
          if (e.outputFile) {
            this.outputFile = e.outputFile.data;
          }
        },
        parameterstable: parameterstable,
      },
    });
  }

  onUpdate() {
    this.gProcessor.setJsCad(this.editingProduct.code);
    this.gProcessor.rebuildSolids();
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  generateOutputFile() {
    this.gProcessor.generateOutputFile({
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
