import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateAccountPageRoutingModule } from './activate-account-routing.module';

import { ActivateAccountPage } from './activate-account.page';
import { SharedDirectiveModule } from '../directives/shared-directive/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateAccountPageRoutingModule,
    ReactiveFormsModule,
    SharedDirectiveModule
  ],
  declarations: [ActivateAccountPage]
})
export class ActivateAccountPageModule {}
