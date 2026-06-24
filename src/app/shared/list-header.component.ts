import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-list-header',
  template: `
    <div class="content-title-group">
      <a router-link="/">
        <h2 class="title">{{title}}</h2>
      </a>
    </div>
  `
})
export class ListHeaderComponent implements OnInit {
  @Input() title!: string;
  @Output() add = new EventEmitter();
  @Output() refresh = new EventEmitter();

  ngOnInit() { }

  handleAdd() {
    this.add.emit();
  }
  handleRefresh() {
    this.refresh.emit();
  }
}
