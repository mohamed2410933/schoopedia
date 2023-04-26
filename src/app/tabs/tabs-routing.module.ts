import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: '',
        redirectTo: 'favorate',
        pathMatch: 'full'
      },
      // {
      //   path: 'favorate',
      //   loadChildren: () => import('../favorate/favorate.module').then( m => m.FavoratePageModule)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      // },
      // {
      //   path: 'grades/:id',
      //   loadChildren: () => import('../grades/grades.module').then( m => m.GradesPageModule)
      // },
      // {
      //   path: 'grade-sections/:cid/:gid',
      //   loadChildren: () => import('../grade-sections/grade-sections.module').then( m => m.GradeSectionsPageModule)
      // },
      // {
      //   path: 'subjects/:Iid/:gid',
      //   loadChildren: () => import('../subjects/subjects.module').then( m => m.SubjectsPageModule)
      // },
      // {
      //   path: 'gardes-prameters',
      //   loadChildren: () => import('../gardes-prameters/gardes-prameters.module').then( m => m.GardesPrametersPageModule)
      // },
      // {
      //   path: 'lessons/:id',
      //   loadChildren: () => import('../lessons/lessons.module').then( m => m.LessonsPageModule)
      // },
      // {
      //   path: 'lesson-videos/:sid/:cid',
      //   loadChildren: () => import('../lesson-videos/lesson-videos.module').then( m => m.LessonVideosPageModule)
      // },
      // {
      //   path: 'show-video',
      //   loadChildren: () => import('../show-video/show-video.module').then( m => m.ShowVideoPageModule)
      // },
      // {
      //   path: 'student-profile',
      //   loadChildren: () => import('../student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
      // },
    
    ]
  }
  // {
  //   path:'',
  //   redirectTo:'tabs/home',
  //   pathMatch:'full'
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
