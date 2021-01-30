import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenjscadComponent } from './openjscad.component';

describe('OpenjscadComponent', () => {
  let component: OpenjscadComponent;
  let fixture: ComponentFixture<OpenjscadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenjscadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenjscadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
