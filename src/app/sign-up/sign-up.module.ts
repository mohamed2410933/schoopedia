import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { SharedDirectiveModule } from '../directives/shared-directive/shared-directive.module';
// import { DetectLanguageDirective } from '../directives/detect-language.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
    SharedDirectiveModule
    
   
  ],
  declarations: [SignUpPage ]
})
export class SignUpPageModule {}
