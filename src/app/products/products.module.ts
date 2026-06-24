import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
],
    exports: [RouterModule, ProductsComponent],
})
export class ProductsModule {}
