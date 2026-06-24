import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpenjscadComponent } from './openjscad.component';

const routes: Routes = [
  {
    path: '',
    component: OpenjscadComponent,
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), OpenjscadComponent],
    exports: [RouterModule, OpenjscadComponent],
})
export class OpenjscadModule {}
