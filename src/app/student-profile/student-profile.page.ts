import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImagePickerModal } from '../image-picker-modal/image-picker-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

import { ViewService } from '../services/view.service';
import { ConfirmationMessageService } from '../services/confirmation-message.service';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit  , ViewDidEnter  , ViewWillEnter {
  student = {
    name: 'John Doe',
    country: 'United States',
    profileImg: 'path/to/circle-img.png',
    activeGrade: 'الصف الاول الاعدادي'
  };
  imageDataUrl: any | undefined = "https://www.w3schools.com/w3images/avatar2.png";
  currentInfo:any;
  selectedGrade: string = '1';
  activeGrade: string = '1';
  userData:any
  // student = {
  //   name: '',
  //   school: 'ABC School',
  //   grade: 'Grade 10',
  //   email: 'john.doe@example.com',
  //   phone: '555-555-5555',
  //   address: '123 Main St, Anytown USA'
  // };
  imageData: any;
  gradesList:any =[]
  constructor(
    public actionSheetController: ActionSheetController , 
    private camera: Camera,
    private modalController: ModalController,  
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    private router: Router,
    private authService:AuthService,
    private loadingService : LoadingService,
    private viewService:ViewService,
    private confirmationMessageService: ConfirmationMessageService

    ) { }
  ionViewWillEnter(): void {
    // throw new Error('Method not implemented.');
    // console.log(1);
    this.getStudentCountryGrades();

    
  }
  ionViewDidEnter(): void {
  // console.log(2);
  
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
     let data = localStorage.getItem('userAuth') || '';
     if(data){
      this.userData  = JSON.parse(data);
     }

    //  this.getStudentCountryGrades();
  }


  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'تغيير الصورة الشخصية',
      cssClass: 'my-action-sheet',
      buttons: [
        {
          text: 'ألتقاط صورة',
          icon: 'camera',
          handler: () => {
            this.takePicture();
            actionSheet.dismiss();
          },
        },
        {
          text: 'إختيار من المعرض',
          icon: 'image',
          handler: () => {
            this.choosePicture();
            actionSheet.dismiss();
          },
        },
        {
          text: 'إلغاء',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            actionSheet.dismiss();
          },
        },
      ],
    });

    await actionSheet.present();
  }



    async takePicture() {
      // debugger
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
      };
  
      try {
        const imageData = await this.camera.getPicture(options);
        this.imageDataUrl = 'data:image/jpeg;base64,' + imageData;
      } catch (e) {
        console.log(e);
      }
    }
  
    async choosePicture() {
      // debugger
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      };
  
      try {
        const imageData = await this.camera.getPicture(options);
        this.imageDataUrl = 'data:image/jpeg;base64,' + imageData;
      } catch (e) {
        console.log(e);
      }
    }
  
    clearPicture() {
      this.imageDataUrl = null;
    }


 
    grades: {[country: string]: string[]} = {
      'مصر': ['الصف الاول الاعدادي'  , 'الصف الثاني الاعدادي'],
      'السعودية': ['الصف الاول الابتدائي'  , 'الصف الثاني الثانوي']
    };
  
    // gradeGroups: string[] = Object.keys(this.grades);
  
    selectGrade(grade: string) {
      this.student.activeGrade = grade;
    }
    onChangeGrade(grade: string) {
      // Implement your code to change the grade here
    }
  
    async onSaveGrade() {
      // Implement your code to save the grade here
      const toast = await this.toastController.create({
        message: 'Grade updated successfully',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    }




    getStudentCountryGrades(){
      this.loadingService.present();
      this.viewService.GetStudentCountryGrades().then((res : any) =>{
        this.loadingService.dismiss();
        this.getCountryAndGrades(res.grades)
         this.currentInfo = res.grades.find((info:any) => info.current === "true");

      }).catch((err : any)=>{
        this.loadingService.dismiss();
         this.loadingService.presentToastWithOptions(err.error.message);
      })
    }


    // public 
     getCountryAndGrades(arr:any) {
      const countries :any = {};
    
      arr?.forEach((obj : any) => {
        const countryName = obj.country_name;
        const gradeName = obj.grade_name;
        const gradeId = obj.grade_id;
    
        if (!countries[countryName]) {
          countries[countryName] = [];
        }
        countries[countryName].push({gradeName :gradeName , grade_id : gradeId });
      });
    
      const result = [];
    
      for (const [countryName, grades] of Object.entries(countries)) {
        result.push({ country: countryName, grades });
      }
    
      this.gradesList =   result;
    }
    
  
    async changeGrade(grade: any) {
      const confirmed = await this.confirmationMessageService.showConfirmationMessage('هل أنت متأكد من رغبتك في تغيير الصف؟');
      // if (confirmed) {
        this.ChangeGrade(grade.grade_id)
        // Perform the desired action here
        // console.log('Confirmed grade change');
      // }
    }
    


    ChangeGrade(gradeId:any){
      this.loadingService.present();
      this.viewService.ChangeGrade(gradeId).then((res:any)=>{
        // currentInfo?.grade_name
        this.currentInfo = res.grades;
        for (let prop in this.currentInfo) {
          if (prop === 'grade_id') {
            this.currentInfo['grade_Id'] = this.currentInfo[prop];
            delete this.currentInfo[prop];
          }
          if (prop === 'info_id') {
            this.currentInfo['info_Id'] = this.currentInfo[prop];
            delete this.currentInfo[prop];
          }
        }
        localStorage.setItem('currentInfo', JSON.stringify(this.currentInfo));
        this.loadingService.presentToastWithOptions('تم تغيير الصف الدراسي بنجاح');
        this.loadingService.dismiss();
      }).catch((err)=>{
        this.loadingService.dismiss();
        this.loadingService.presentToastWithOptions(err.error.message);
      })
    }

  }




