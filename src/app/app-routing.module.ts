
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesPageModule)
  },

  {
    path: 'activate-account',
    loadChildren: () => import('./activate-account/activate-account.module').then( m => m.ActivateAccountPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'forget-code',
    loadChildren: () => import('./forget-code/forget-code.module').then( m => m.ForgetCodePageModule)
  },


  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  // },


  {
    path: 'favorate',
    loadChildren: () => import('./favorate/favorate.module').then( m => m.FavoratePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'grades/:id',
    loadChildren: () => import('./grades/grades.module').then( m => m.GradesPageModule)
  },
  {
    path: 'grade-sections/:cid/:gid',
    loadChildren: () => import('./grade-sections/grade-sections.module').then( m => m.GradeSectionsPageModule)
  },
  {
    path: 'subjects/:Iid/:gid',
    loadChildren: () => import('./subjects/subjects.module').then( m => m.SubjectsPageModule)
  },
  {
    path: 'gardes-prameters',
    loadChildren: () => import('./gardes-prameters/gardes-prameters.module').then( m => m.GardesPrametersPageModule)
  },
  {
    path: 'lessons/:id',
    loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsPageModule)
  },
  {
    path: 'lesson-videos/:sid/:cid',
    loadChildren: () => import('./lesson-videos/lesson-videos.module').then( m => m.LessonVideosPageModule)
  },
  {
    path: 'show-video',
    loadChildren: () => import('./show-video/show-video.module').then( m => m.ShowVideoPageModule)
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  },
  // {
  //   path: 'grades/:id',
  //   loadChildren: () => import('./grades/grades.module').then( m => m.GradesPageModule)
  // },
  // {
  //   path: 'grade-sections/:cid/:gid',
  //   loadChildren: () => import('./grade-sections/grade-sections.module').then( m => m.GradeSectionsPageModule)
  // },
  // {
  //   path: 'subjects/:Iid/:gid',
  //   loadChildren: () => import('./subjects/subjects.module').then( m => m.SubjectsPageModule)
  // },
  // {
  //   path: 'gardes-prameters',
  //   loadChildren: () => import('./gardes-prameters/gardes-prameters.module').then( m => m.GardesPrametersPageModule)
  // },
  // {
  //   path: 'lessons/:id',
  //   loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsPageModule)
  // },
  // {
  //   path: 'lesson-videos/:sid/:cid',
  //   loadChildren: () => import('./lesson-videos/lesson-videos.module').then( m => m.LessonVideosPageModule)
  // },
  // {
  //   path: 'show-video',
  //   loadChildren: () => import('./show-video/show-video.module').then( m => m.ShowVideoPageModule)
  // },
  // {
  //   path: 'student-profile',
  //   loadChildren: () => import('./student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

