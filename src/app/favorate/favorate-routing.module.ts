import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoratePage } from './favorate.page';

const routes: Routes = [
  {
    path: '',
    component: FavoratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoratePageRoutingModule {}
