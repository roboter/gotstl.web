import { AsyncPipe } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ModalComponent } from '../shared/modal.component';
import { ListHeaderComponent } from '../shared/list-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../core';
import { ProductService, ProductsService } from './product.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterModule, ProductListComponent, ProductDetailComponent, ModalComponent, ListHeaderComponent],

  selector: 'app-products',
  templateUrl: 'product.component.html',
})
export class ProductsComponent implements OnInit {
  selected!: Product | null;
  products$: Observable<Product[]>;
  message = '?';
  productToDelete!: Product | null;
  showModal = false;

  constructor(private productService: ProductsService) {
    this.products$ = productService.entities$;
  }

  ngOnInit() {
    this.getProducts();
  }

  add(product: Product) {
    this.productService.add(product);
  }

  askToDelete(product: Product) {
    this.productToDelete = product;
    this.showModal = true;
    if (this.productToDelete.name) {
      this.message = `Would you like to delete ${this.productToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteProduct() {
    this.closeModal();
    if (this.productToDelete) {
      this.productService
        .delete(this.productToDelete.id)
        .subscribe(() => (this.productToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getProducts() {
    this.productService.getAll();
    this.clear();
  }

  save(product: Product) {
    if (this.selected && this.selected.name) {
      this.update(product);
    } else {
      this.add(product);
    }
  }

  select(product: Product) {
    this.selected = product;
  }

  update(product: Product) {
  //  this.productService.update(product);
  }
}
