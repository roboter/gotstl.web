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
import * as gProcessor from '@jscad/web';

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

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.product && this.product.id) {
      this.editingProduct = { ...this.product };
      this.addMode = false;
      const viewerDiv = document.getElementById('viewerContext');
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
        viewerwidth: '100%',
        viewerheight: '100%',
        drawLines: true,
        drawFaces: true,
        processor: {
          viewerdiv: viewerDiv,
        },
        init: {
          onUpdate: (e, e1) => {
            console.table(e);
            console.table(e1);
          },
        },
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
}
