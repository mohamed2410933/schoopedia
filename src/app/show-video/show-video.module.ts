import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowVideoPageRoutingModule } from './show-video-routing.module';
import { ShowVideoPage } from './show-video.page';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YouTubePlayerModule,
    ShowVideoPageRoutingModule,
    
  ],

  declarations: [ShowVideoPage]
})
export class ShowVideoPageModule {}
