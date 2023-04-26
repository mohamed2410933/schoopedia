import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationMessageService {

  constructor(private alertController: AlertController) { }

  async showConfirmationMessage(message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'رسالة تأكيد',
      message: message,
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel'
        },
        {
          text: 'تأكيد',
          handler: () => {
            // Handle the confirmation action here
            return true;
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

}
