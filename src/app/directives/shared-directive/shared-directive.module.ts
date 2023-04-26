import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectLanguageDirective } from '../detect-language.directive';



@NgModule({
  declarations: [DetectLanguageDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DetectLanguageDirective
  ]
})
export class SharedDirectiveModule { }
