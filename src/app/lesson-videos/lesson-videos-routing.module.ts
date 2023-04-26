import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonVideosPage } from './lesson-videos.page';

const routes: Routes = [
  {
    path: '',
    component: LessonVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonVideosPageRoutingModule {}
