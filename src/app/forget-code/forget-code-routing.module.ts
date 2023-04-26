import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetCodePage } from './forget-code.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetCodePageRoutingModule {}
