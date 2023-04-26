import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userAuth:any
  constructor(
    public actionSheetController: ActionSheetController , 
    private router: Router,
    private authService:AuthService,
    private loadingService : LoadingService,
  ) { }

  ngOnInit() {
    this.userAuth = localStorage.getItem('userAuth') || '';
    if(this.userAuth){
      this.userAuth = JSON.parse(this.userAuth);
   }
  }

  logout(){
    this.loadingService.present();
      this.authService.Logout().then(res=>{
        this.loadingService.dismiss();
        // localStorage.removeItem('token');
        localStorage.clear()
         this.router.navigate(['/sign-in']);
      }).catch(err=>{
        this.loadingService.dismiss();
        localStorage.clear()
        this.router.navigate(['/sign-in']);
        // this.loadingService.presentToastWithOptions('خطأ في النظام ');
      })

    }


    toStudentProfile(){
      this.router.navigate(['/student-profile']);
    }
}
