import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userAuth:any;
  currentInfo:any;


    constructor(public router : Router , private generalService:GeneralService) {
        // localStorage.clear();
      // this.generalService.setData(true);
    }



  checkToken(){
    this.userAuth = localStorage.getItem('userAuth') || '';
    if(this.userAuth){
       this.userAuth = JSON.parse(this.userAuth);
    }
     let info = localStorage.getItem('currentInfo') || '';
    if(info){
     this.currentInfo = JSON.parse(info);
    //  this.router.navigate([`/tabs/subjects/${this.currentInfo.infoId
    //  }/${this.currentInfo.gradeId}`]);
    this.router.navigate([`/app/tabs/subjects`]);

    }
      else if(this.userAuth?.token){
        this.router.navigate(['./countries']);
      }
    else{
        this.router.navigate(['/sign-in']);
    }


  }

}
