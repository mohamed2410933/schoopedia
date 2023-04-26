import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeSectionsPageRoutingModule } from './grade-sections-routing.module';

import { GradeSectionsPage } from './grade-sections.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeSectionsPageRoutingModule
  ],
  declarations: [GradeSectionsPage]
})
export class GradeSectionsPageModule {}
