import { Component } from '@angular/core';

@Component({
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
