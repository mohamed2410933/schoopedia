import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {

  //#region Public Variables
  countriesList : any = []
  selectedCountry:number=0
  loaded = false
  //#endregion


  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
  ) { }

  ngOnInit() {
    this.getAllCountries();
  }


  getAllCountries(){

    this.loaded =false;
    this.viewService.GetAllCountries().then((res:any) =>{
      this.loaded =true;
         this.countriesList = res.success;
    }).catch(err=>{
      this.loaded =true;
    })
  }

  setRow(item:any) {
    this.selectedCountry = item;
  }

  // getGradeByCountryId(){
  //   this.loaded =false;
  //   this.viewService.GetGradeByCountryId(this.selectedCountry).then((res:any) =>{
  //     this.loaded =true;
  //   this.router.navigate(['./grade-sections']);
  //   }).catch(err=>{
  //     this.loaded =true;
  //   })
  // }

  // toGradesSection(){
  // //   this.router.navigate(['./grade-sections']);
    
  // }


  handleRefresh(event:any) {
      this.getAllCountries()
      event.target.complete();
  };


  toGardes(){
    this.router.navigate([`/grades/${this.selectedCountry}`])
  }
}
