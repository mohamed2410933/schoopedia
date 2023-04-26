import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-forget-code',
  templateUrl: './forget-code.page.html',
  styleUrls: ['./forget-code.page.scss'],
})
export class ForgetCodePage implements OnInit {

  email:any
  forget_code:any
  public hideImage : boolean = false
  forgetCodeForm!: FormGroup;
  validations = {
    // 'email': [
    //   { type: 'required', message: 'البريد الالكتروني مطلوب' },
    //   // { type: 'pattern', message: 'البريد الالكتروني غير صحيح' },
    // ],
    'forget_code':[ 
      { type: 'required', message: 'كود التفعيل مطلوب' },
    ],
 
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

this.forgetCodeForm = new FormGroup({
  'email': new FormControl(''),
  'forget_code': new FormControl('', Validators.compose([
    Validators.required,
    ]))
});

let data = localStorage.getItem('userData') || '';
this.forgetCodeForm.get('email')!.patchValue(JSON.parse(data).email);


  }

  ForgetCode(){
    this.loadingService.present();
    this.authService.ForgetCode(this.forgetCodeForm.value).then((res : any)=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions(res.message);
      this.router.navigate(['./reset-password']);
    }).catch((err : any)=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions(err.error.message)
    })
  }


  public validate() {
    if (this.forgetCodeForm.invalid) {
      for (const control of Object.keys(this.forgetCodeForm.controls)) {
        this.forgetCodeForm.controls[control].markAsTouched();
      }
      return;
    }else{
      this.ForgetCode()
    }
  }
}
