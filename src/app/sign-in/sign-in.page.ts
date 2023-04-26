import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController  , Platform} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  //#region Public Variables
  public userName:any = 'mohamedawad1193@gmail.com'
  public inputType:any = 'password'
  public userPassword:any = '123456'
  public data:any
  public isData : boolean = false
  public hideImage : boolean = false;
  loginForm!: FormGroup;
  loading:any

  //#endregion

    validations = {
    'email': [
      { type: 'required', message: 'البريد الالكتروني مطلوب' },
    ],
    'password':[
      { type: 'required', message: 'كلمة المرور مطلوبة' },
    ],

    // other validations
  };

  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    public authService : AuthService,
    private loadingService : LoadingService,
    private platform: Platform,
    public leo:PlatformLocation ,
    public formBuilder: FormBuilder
  ) {
    leo.onPopState(()=>{
      // navigator["app"].exitApp();
    })

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        ]))
    });
  }

  currentInfo:any
  public login() {
    this.loadingService.present();
    this.authService.login(this.loginForm.value).then((res:any) => {
    this.loadingService.dismiss();
      this.data=res.data;
      localStorage.setItem('token',this.data.token)
      localStorage.setItem('userAuth' , JSON.stringify(this.data))
      localStorage.setItem('studentInfo' , JSON.stringify(this.data.studentInfo))
      if(this.data.studentInfo){
           const currentInfo = this.data.studentInfo.find((info:any) => info.current === "true");
            localStorage.setItem('currentInfo' , JSON.stringify(currentInfo))


          let info = localStorage.getItem('currentInfo') || '';
          if(info){
           this.currentInfo = JSON.parse(info);
            // this.router.navigate([`/tabs/subjects/${this.currentInfo.infoId
            // }/${this.currentInfo.gradeId}`]);
            this.router.navigate([`/tabs/`]);


          // }
         }
        }else{
          this.router.navigate(['./countries']);
        }
    }).catch(err=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions('خطأ في اسم المستخدم او كلمة المرور');
    })
  }


  public validate() {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    }else{
      this.login()
    }
  }



  // async showLoading() {
  //    this.loading = await this.loadingCtrl.create({
  //     message:'... جاري التحميل',
  //     duration: 556446464,
  //     cssClass: 'custom-loading',
  //     animated: true
  //   });
  // }


  // async present() {
  //   this.loading = true;
  //   return await this.loadingCtrl.create({
  //         message:'... جاري التحميل',
  //         cssClass: 'custom-loading',
  //         animated: true
  //   }).then(a => {
  //     a.present().then(() => {
  //       console.log('presented');
  //       if (!this.loading) {
  //         a.dismiss().then(() => console.log('abort presenting'));
  //       }
  //     });
  //   });
  // }

  // async dismiss() {
  //   this.loading = false;
  //   return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  // }

}
