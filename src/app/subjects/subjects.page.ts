import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  //#region  Public Variables
    loaded = false;
    subjectsList :any=[];
    gradeId:any
    infoId:any
    userAuth:any
    currentUserInfo:any
    defaultImage: string = 'assets/images/subject.png';
  //#endregion

  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    public generalService : GeneralService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    let info = localStorage.getItem('currentInfo') || '';
    if(info){
      this.currentUserInfo = JSON.parse(info);
    }
    // this.gradeId=this.activateRoute.snapshot.params['gid'];
    // this.infoId=this.activateRoute.snapshot.params['Iid'];
    this.getStudentSubjectId(this.currentUserInfo.grade_id)


    
  }

  openMenu() {
    this.menuCtrl.open('sideMenu');
  }


  getStudentSubjectId(id:any){
      this.loaded =false;
     this.userAuth = localStorage.getItem('userAuth') || '';
     if( this.userAuth){
      this.userAuth = JSON.parse(this.userAuth);
     }
    this.viewService.GetStudentSubject(this.currentUserInfo.info_id ,  this.currentUserInfo.grade_id).then((res:any) =>{
      this.loaded =true;
      this.subjectsList = res.success;
        console.log(this.subjectsList);
    }).catch(err=>{
      this.loaded =true;
    })
  }


  setDefaultImage() {
    this.userAuth.image = this.defaultImage;
  }
}
