import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetCodePageRoutingModule } from './forget-code-routing.module';

import { ForgetCodePage } from './forget-code.page';
import { SharedDirectiveModule } from '../directives/shared-directive/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetCodePageRoutingModule,
    ReactiveFormsModule,
    SharedDirectiveModule

  ],
  declarations: [ForgetCodePage]
})
export class ForgetCodePageModule {}
