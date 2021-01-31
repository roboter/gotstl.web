import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as gProcessor from '@jwc/jscad-web';
import { Product } from '../core';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  @Input() product: Product;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Product>();

  addMode = false;
  editingProduct: Product;
  public gProcessor = null;
  sanitizedURL: SafeResourceUrl;
  public outputFile: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.product && this.product.id) {
      this.editingProduct = { ...this.product };
      this.addMode = false;
      const viewerDiv = document.getElementById('viewerContext');
      const parameterstable = document.getElementById('parameterstable');
      const design = this.editingProduct.file;
      const headers = new HttpHeaders().set(
        'Content-Type',
        'text/plain; charset=utf-8',
      );
      this.http
        .get(design, { headers, responseType: 'text' })
        .subscribe((res: string) => (this.editingProduct.code = res));

      viewerDiv.setAttribute('design-url', this.editingProduct.file);

      this.gProcessor = new gProcessor(viewerDiv, {
        drawLines: true,
        drawFaces: true,
        processor: {
          viewerdiv: viewerDiv,
          setStatus: (e, e1) => {
            console.table(e);
            console.table(e1);
          },
          onUpdate: (e, e1) => {
            if (e.outputFile) {
              this.outputFile = e.outputFile.data;
            }
          },
          parameterstable: parameterstable,
        },
        // init: {
        //   onUpdate: (e, e1) => {
        //     console.table(e);
        //     console.table(e1);
        //   },
        // },
      });
    } else {
      this.editingProduct = {
        id: undefined,
        name: '',
        description: '',
        quantity: 1,
        image: '',
        file: '',
        code: 'test',
      };
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveProduct() {
    this.save.emit(this.editingProduct);
    this.clear();
  }

  onUpdate() {
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
