import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-card-content',
  template: `
    <div class="card-content">
      <div class="content">
        <div class="name">{{ name }}</div>
        <div class="description">{{ description }}</div>
      </div>
    </div>
  `
})
export class CardContentComponent implements OnInit {
  @Input() name!: string;
  @Input() description!: string;

  ngOnInit() {}
}
