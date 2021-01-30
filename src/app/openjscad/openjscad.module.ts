import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OpenjscadComponent } from './openjscad.component';

const routes: Routes = [
  {
    path: '',
    component: OpenjscadComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule, OpenjscadComponent],
  declarations: [OpenjscadComponent],
})
export class OpenjscadModule {}
