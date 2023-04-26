import { Injectable, NgZone } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  isLoading = false;

  constructor(public loadingController: LoadingController,
    public toastController : ToastController,
    ) { }

  async present() {
    
    this.isLoading = true;
    return await this.loadingController.create({
          message:'... جاري التحميل',
          cssClass: 'custom-loading',
          animated: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => 
          console.log('')
          );
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }



  async presentToastWithOptions(message:any) {
    const toast = await this.toastController.create({
      // header: 'User name or email is invalid',
      message: message,
      icon: 'close-circle-outline',
      position: 'top',
      duration: 1000,
      cssClass: 'toast-custom-class',
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
