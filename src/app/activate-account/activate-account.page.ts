import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.page.html',
  styleUrls: ['./activate-account.page.scss'],
})
export class ActivateAccountPage implements OnInit {

  
  email:any
  active_code:any
  public hideImage : boolean = false;
  activateForm!: FormGroup
  validations = {
    // 'email': [
    //   { type: 'required', message: 'البريد الالكتروني مطلوب' },
    // ],
    'active_code':[ 
      { type: 'required', message: 'كود التفعيل مطلوب' },
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
    this.activateForm = new FormGroup({
      'email': new FormControl(''),
      'active_code': new FormControl('', Validators.compose([
        Validators.required,
        ])),
    });

let data = localStorage.getItem('userData') || '';
this.activateForm.get('email')!.patchValue(JSON.parse(data).email);

// let newObject = localStorage.getItem("myObject");
// console.log(JSON.parse(newObject));
  }

  ActivateCode(){
    this.loadingService.present();
    this.viewService.ActivateAccount(this.activateForm.value).then((res : any)=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions(res.message);
      this.router.navigate(['./sign-in']);
    }).catch(err=>{
      this.loadingService.dismiss();
      this.loadingService.presentToastWithOptions(err.error.message)
    })
  }

  public validate() {
    if (this.activateForm.invalid) {
      for (const control of Object.keys(this.activateForm.controls)) {
        this.activateForm.controls[control].markAsTouched();
      }
      return;
    }else{
      this.ActivateCode()
    }
  }
}
