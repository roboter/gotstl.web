import { CardContentComponent } from '../shared/card-content.component';
import { ButtonFooterComponent } from '../shared/button-footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CardContentComponent, ButtonFooterComponent],

  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products!: Product[] | null;
  @Output() deleted = new EventEmitter<Product>();
  @Output() selected = new EventEmitter<Product>();

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  deleteProduct(product: Product) {
    this.deleted.emit(product);
  }
}
