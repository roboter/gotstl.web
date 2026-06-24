import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-not-found',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> &nbsp;
        <span class="title">These aren't the bits you're looking for</span>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
