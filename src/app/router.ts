import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './core';
import { ProductDetailsComponent } from './product-details/product-details.component';

 
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'openjscad',
    loadChildren: () =>
      import('./openjscad/openjscad.module').then((m) => m.OpenjscadModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'product/:id',
    component:ProductDetailsComponent
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
