import { ButtonFooterComponent } from '../shared/button-footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
// @ts-ignore
import * as gProcessor from '@jwc/jscad-web';
import { Product } from '../core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonFooterComponent, FormsModule],

  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product | null;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Product>();

  addMode = false;
  editingProduct!: Product;
  public gProcessor: any = null;
  sanitizedURL!: SafeResourceUrl;
  public outputFile: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
        .subscribe((res: string) => {
          this.editingProduct.code = res;
          this.save.emit(this.editingProduct);
        });

      viewerDiv?.setAttribute('design-url', this.editingProduct.file);

      this.gProcessor = new gProcessor(viewerDiv, {
        drawLines: true,
        drawFaces: true,
        processor: {
          viewerdiv: viewerDiv,
          setStatus: (e: any, e1: any) => {
            console.table(e);
            console.table(e1);
          },
          onUpdate: (e: any, e1: any) => {
            if (e.outputFile) {
              this.outputFile = e.outputFile.data;
            }
          },
          parameterstable: parameterstable
        },
      });
    } else {
      this.editingProduct = {
        id: 0,
        name: '',
        description: '',
        image: '',
        file: '',
        code: 'test',
        url: '',
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
    this.gProcessor!.setJsCad(this.editingProduct.code);
    this.gProcessor!.rebuildSolids();
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

