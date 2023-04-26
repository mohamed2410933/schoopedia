import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule  } from '@ionic/angular';

import { LessonVideosPageRoutingModule } from './lesson-videos-routing.module';

import { LessonVideosPage } from './lesson-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonVideosPageRoutingModule,
  ],
  declarations: [LessonVideosPage]
})
export class LessonVideosPageModule {}
