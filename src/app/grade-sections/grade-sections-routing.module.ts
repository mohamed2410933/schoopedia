import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeSectionsPage } from './grade-sections.page';

const routes: Routes = [
  {
    path: '',
    component: GradeSectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeSectionsPageRoutingModule {}
