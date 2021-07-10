import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
  Logger,
} from '@ngrx/data';
import { Product } from '../core';

@Injectable({ providedIn: 'root' })
export class ProductsService extends EntityCollectionServiceBase<Product> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}

// @Injectable({ providedIn: 'root' })
// export class Produc11tService extends EntityDataService {
//   constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
//     super('Product', serviceElementsFactory);
//   }
// }

@Injectable({ providedIn: 'root' })
export class ProductService extends DefaultDataService<Product> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
  ) {
    super('hero', http, httpUrlGenerator);
    logger.log('Created custom Product EntityDataService');
  }
}
