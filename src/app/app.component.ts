import { Component, Inject, QueryList, ViewChildren } from '@angular/core';

import { NavController, Platform, ModalController, IonRouterOutlet } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router , NavigationEnd } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { GeneralService } from './services/general.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChildren(IonRouterOutlet)
  routerOutlets!: QueryList<IonRouterOutlet>;
  currentInfo:any
  constructor(

    private platform: Platform, private navCtrl: NavController,
    private modalController: ModalController,
    private generalService : GeneralService,
     public router: Router,private location:Location  , private l:PlatformLocation)
   {
    this.backButtonEvent()


      
      
        

     this.currentInfo = localStorage.getItem('currentInfo') || '';
     if(this.currentInfo && this.currentInfo  != '[object Object]'){
      this.currentInfo = JSON.parse(this.currentInfo);
     }
   }

   backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url == "/sing-in" || this.router.url == "/countries" || this.router.url == "/home"  || 
                    this.router.url.includes('/subjects')
           ) {
          navigator['app'].exitApp();
        }
        else {
          await this.location.back();
        }
        const element = document.getElementById('my-element-id');
        if (element) {
          element.classList.remove('my-class');
        }
      });
    });
  }


}



