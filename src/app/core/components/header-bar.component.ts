import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-header-bar',
  template: `
    <header>
      <nav
        class="navbar has-background-dark is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item nav-home" routerLink="/">
            <span class="brand-wrapper">
              <span class="brand-first">GOT</span><span class="brand-second">STL</span><span class="brand-third">.COM</span>
            </span>
          </a>
          <a
            role="button"
            class="navbar-burger"
            [class.is-active]="isBurgerActive"
            aria-label="menu"
            aria-expanded="false"
            (click)="toggleBurger()"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" [class.is-active]="isBurgerActive">
          <div class="navbar-start">
            <a class="navbar-item" routerLink="/products" routerLinkActive="is-active">
              Products
            </a>
            <a class="navbar-item" routerLink="/about" routerLinkActive="is-active">
              About
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderBarComponent {
  isBurgerActive = false;

  toggleBurger() {
    this.isBurgerActive = !this.isBurgerActive;
  }
}
