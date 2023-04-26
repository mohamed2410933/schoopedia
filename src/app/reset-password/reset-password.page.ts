import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email:any
  new_password:any
  inputType:any = 'password'
  public hideImage : boolean = false
  resetPasswordForm!: FormGroup;

  validations = {
    // 'email': [
    //   { type: 'required', message: 'البريد الالكتروني مطلوب' },
    //   // { type: 'pattern', message: 'البريد الالكتروني غير صحيح' },
    // ],
    'new_password':[ 
      { type: 'required', message: 'كلمة المرور الجديدة مطلوبة' },
    ],
 
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

    this.resetPasswordForm = new FormGroup({
      'email': new FormControl(''),
      'new_password': new FormControl('', Validators.compose([
        Validators.required,
        ]))
    });



    let data = localStorage.getItem('userData') || '';
    // this.email  = JSON.parse(data).email;
    this.resetPasswordForm.get('email')!.patchValue(JSON.parse(data).email);
  }

  ResetPassword(){
    this.loadingService.present();
    this.authService.ResetPassword(this.resetPasswordForm.value).then((res:any)=>{
     this.loadingService.dismiss();
     this.loadingService.presentToastWithOptions(res.message)
      this.router.navigate(['./sign-in'])
    }).catch(err=>{
     this.loadingService.dismiss();
     this.loadingService.presentToastWithOptions(err.error.message)
    })
    // console.log(form)
}
public validate() {
  if (this.resetPasswordForm.invalid) {
    for (const control of Object.keys(this.resetPasswordForm.controls)) {
      this.resetPasswordForm.controls[control].markAsTouched();
    }
    return;
  }else{
    this.ResetPassword()
  }
}


}


