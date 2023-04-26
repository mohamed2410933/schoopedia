import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  //#region Public Variables
  countriesList : any = []
  loaded = false
  gradesList : any = []
  gradeStandardList : any = []
  selectedGrade:number=0
  counteryId:any
  public progress = 0;
  //#endregion


  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    private loadingService : LoadingService,

  ) { }

  ngOnInit() {
    this.counteryId=this.activateRoute.snapshot.params['id'];
    this.getGradeByCountryId(this.counteryId)
  }


  getGradeByCountryId(id:any){
    this.loaded =false;
    this.viewService.GetGradeByCountryId(id).then((res:any) =>{
      this.loaded =true;
        this.gradesList = res.success;
    }).catch(err=>{
      this.loaded =true;
    })
  }

  setRow(item:any) {
    this.selectedGrade = item;
  }


  goToStandardPage(){
      this.router.navigate([`/grade-sections/${this.counteryId}/${this.selectedGrade}`])
  }
}
