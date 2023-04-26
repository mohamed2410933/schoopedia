import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  email:any
  acitaveCode:any
  public hideImage : boolean = false
  forgetPasswordForm!: FormGroup;

  validations = {
    'email': [
      { type: 'required', message: 'البريد الالكتروني مطلوب' },
      // { type: 'pattern', message: 'البريد الالكتروني غير صحيح' },
    ]
    // other validations
  };
  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    public authService : AuthService,
    private loadingService : LoadingService
  ) { }

  ngOnInit() {
  
    this.forgetPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
    });

    let data = localStorage.getItem('userData') || '';
    // this.email  = JSON.parse(data).email;
    this.forgetPasswordForm.get('email')!.patchValue(JSON.parse(data).email);

  }

  ForgetPassword(){
    this.loadingService.present();
    this.authService.ForgetPassword(this.forgetPasswordForm.value).then((res:any)=>{
     this.loadingService.dismiss();
     this.loadingService.presentToastWithOptions(res.message)
      this.router.navigate(['./forget-code'])
    }).catch(err=>{
     this.loadingService.dismiss();
     this.loadingService.presentToastWithOptions(err.error.message)
    })
}

public validate() {
  if (this.forgetPasswordForm.invalid) {
    for (const control of Object.keys(this.forgetPasswordForm.controls)) {
      this.forgetPasswordForm.controls[control].markAsTouched();
    }
    return;
  }else{
    this.ForgetPassword()
  }
}

}
