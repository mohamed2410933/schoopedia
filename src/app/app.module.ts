import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectiveModule } from './directives/shared-directive/shared-directive.module';
import { Camera } from '@ionic-native/camera/ngx';
import { HomePageModule } from './home/home.module';
import { SettingsPageModule } from './settings/settings.module';
// import { VideoPlayer } from '@ionic-native/video-player';
// import { VideoPlayer } from '@ionic-native/video-player/ngx';
// import { YouTubePlayerModule } from '@angular/youtube-player';
import { FavoratePageModule } from '../app/favorate/favorate.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    scrollPadding: true,
    scrollAssist: false
  }), AppRoutingModule,HttpClientModule ,FormsModule,
  ReactiveFormsModule,
  SharedDirectiveModule,
  // YouTubePlayerModule
  HomePageModule,
  FavoratePageModule,
  SettingsPageModule
],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // VideoPlayer,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
