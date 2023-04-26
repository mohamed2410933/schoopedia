import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-picker-modal',
  template: 'app-image-picker-modal.html'
})
export class ImagePickerModal {
  @Input() title: string | undefined;
  imageData: SafeResourceUrl | undefined;

  constructor(private modalController: ModalController, private camera: Camera, private sanitizer: DomSanitizer) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    const imageData = await this.camera.getPicture(options);

    this.imageData = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);

    this.modalController.dismiss({
      imageData: this.imageData
    });
  }

  async chooseFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // mediaType

    }
  }
}