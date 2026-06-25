import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-card-content',
  template: `
    <div class="card-content">
      <div class="content">
        <div class="name">{{ product.name }}</div>
        <div class="description">{{ product.description }}</div>
        
        @if (product.author) {
          <div class="is-size-7 mt-2 has-text-grey">
            <span class="icon is-small"><i class="fas fa-user"></i></span>
            {{ product.author }}
          </div>
        }
        
        @if (product.license) {
          <div class="is-size-7 has-text-grey">
            <span class="icon is-small"><i class="fas fa-balance-scale"></i></span>
            {{ product.license }}
          </div>
        }
        
        @if (product.tags && product.tags.length) {
          <div class="tags mt-3 mb-0">
            @for (tag of product.tags; track tag) {
              <span class="tag is-light is-info">{{ tag }}</span>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class CardContentComponent implements OnInit {
  @Input() product!: Product;

  ngOnInit() {}
}
