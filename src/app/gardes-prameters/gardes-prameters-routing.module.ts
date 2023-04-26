import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GardesPrametersPage } from './gardes-prameters.page';

const routes: Routes = [
  {
    path: '',
    component: GardesPrametersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GardesPrametersPageRoutingModule {}
