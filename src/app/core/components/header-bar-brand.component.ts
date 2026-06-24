import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-header-bar-brand',
  template: `
    <div class="navbar-brand">
      <a class="navbar-item nav-home" router-link="/">
        <span class="brand-first">GOT</span>
        <span class="brand-second">STL</span>
        <span class="brand-third">.COM</span>
      </a>
    </div>
  `,
})
export class HeaderBarBrandComponent {}
