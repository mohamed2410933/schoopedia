import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GardesPrametersPageRoutingModule } from './gardes-prameters-routing.module';

import { GardesPrametersPage } from './gardes-prameters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GardesPrametersPageRoutingModule
  ],
  declarations: [GardesPrametersPage]
})
export class GardesPrametersPageModule {}
