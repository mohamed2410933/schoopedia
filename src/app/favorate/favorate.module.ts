import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoratePageRoutingModule } from './favorate-routing.module';

import { FavoratePage } from './favorate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoratePageRoutingModule
  ],
  declarations: [FavoratePage]
})
export class FavoratePageModule {}
