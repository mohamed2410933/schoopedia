import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';

import { ShowVideoPage } from './show-video.page';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { IonicRouteStrategy } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ShowVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[  
     VideoPlayer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },]
})
export class ShowVideoPageRoutingModule {}
