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
      <a href="https://github.com/roboter/gotstl.web" target="_blank" rel="noopener noreferrer">
        <img
          style="position: absolute; top: 0; right: 0; border: 0; z-index: 100;"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png"
          alt="Fork me on GitHub"
        />
      </a>
    </header>
  `,
})
export class HeaderBarComponent {
  isBurgerActive = false;

  toggleBurger() {
    this.isBurgerActive = !this.isBurgerActive;
  }
}
