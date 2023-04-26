import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  userName:any
  inputType:any = 'password'
  inputConfirmPasswordType:any = 'password'
  userPassword:any
  userEmail:any
  data:any
  loading:any
  userConfirmPassword:any
  public hideImage : boolean = false
  registerForm!: FormGroup;
  isSubmitted = false;
  validations = {
    'email': [
      { type: 'required', message: 'البريد الالكتروني مطلوب' },
      // { type: 'pattern', message: 'البريد الالكتروني غير صحيح' },
    ],
    'name':[ 
      { type: 'required', message: 'الاسم مطلوب' },
    ],
    'password':[ 
      { type: 'required', message: 'كلمة المرور مطلوبة' },
    ],
    'password_confirmation':[ 
      { type: 'required', message: 'تاكيد كلمة المرور مطلوبة' },
    ]
    // other validations
  };
  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    public authService : AuthService,
    private loadingService : LoadingService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
        ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        ])),
      'password_confirmation': new FormControl('', Validators.compose([
        Validators.required,
        ])),

        
    });
  }



  public Register() {
    this.loadingService.present();
    this.authService.Register(this.registerForm.value).then((res:any) => {
    this.loadingService.dismiss();
    this.loadingService.presentToastWithOptions(res?.message);
      this.data=res.data;
      localStorage.setItem('userData' , JSON.stringify(this.registerForm.value))
      this.router.navigate(['./activate-account']);
    }).catch(err=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions(err?.error?.message);
    })
  }

  public validate() {
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }else{
      this.Register()
    }
  }







  // checkLanguage(value:any , id:any){
  //   var arabic = /[\u0600-\u06FF]/;
  //   if(arabic.test(value)){
  //     document.getElementById(id)!.style.direction = 'ltr'
  //   }else{
  //     document.getElementById(id)!.style.direction = 'rtl'
  //   }
  // }



}
