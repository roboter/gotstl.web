import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-button-footer',
  template: `
    <button
      class="link"
      [ngClass]="className"
      [attr.aria-label]="label"
      tabindex="0"
      [attr.data-id]="item.id"
      (click)="handleClick()"
    >
      <i [ngClass]="iconClasses"></i> <span>{{ label }}</span>
    </button>
  `
})
export class ButtonFooterComponent implements OnInit {
  @Input() label!: string;
  @Input() className!: string;
  @Input() iconClasses!: string;
  @Input() item: any;
  @Input() dataId: any;

  @Output() clicked = new EventEmitter<any>();

  ngOnInit() {}

  handleClick() {
    this.clicked.emit(this.item);
  }
}
