import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { ViewService } from '../services/view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit , OnDestroy {
 
  //#region Public Variables
    subjectId:any
    subjectInfo:any
    subjectName:any
    loaded = false;
    lessonsList :any=[];
    currentUserInfo:any
  private subscription!: Subscription;

  //#endregion


  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    public generalService : GeneralService
  ) { }



  ngOnInit() {
    this.subjectId=this.activateRoute.snapshot.params['id'];
    this.openSubjectLessons(this.subjectId);
    this.subscription =  this.generalService.selectedSubjectName.subscribe((value:any) => {
      this.subjectInfo = value;
      this.subjectName = this.subjectInfo.subjectName.split('-')[0];
    });
    let info = localStorage.getItem('currentInfo') || '';
    if(info){
      this.currentUserInfo = JSON.parse(info);
      for (let prop in this.currentUserInfo) {
        if (prop === 'grade_id') {
          this.currentUserInfo['grade_Id'] = this.currentUserInfo[prop];
          delete this.currentUserInfo[prop];
        }
        if (prop === 'info_id') {
          this.currentUserInfo['info_Id'] = this.currentUserInfo[prop];
          delete this.currentUserInfo[prop];
        }
      }
      // console.log(this.currentUserInfo);
      
    }
  }

  
   maxDepth = 0;

 

  openSubjectLessons(id:any){
    this.loaded =  false;
    this.viewService.GetLessonsBySubjectId(id).then((res : any)=>{
      this.loaded = true;
         let lessons = res.success; 
         this.lessonsList = lessons;
         this.getMaxDepth(this.lessonsList)
        //  this.maxDepth -= 1; // subtract 1 from maxDepth
       console.log(res);
    }).catch(err=>{
      this.loaded = true;
    })
  }

getMaxDepth(arr:any){
  arr.forEach((item:any) => {
    if (item.DEPTH > this.maxDepth) {
      this.maxDepth = item.DEPTH;
    }
  });
  console.log(this.maxDepth);
  
}

  handleItemClick(item: any): void {
    if (item.DEPTH == this.maxDepth) {
      this.toLessonsLinks(item);
    }
  }
  toLessonsLinks(item:any){
     this.generalService.setLessonVideoData(item)
    this.router.navigate([`/lesson-videos/${item?.SUBJECT_ID}/${item?.CAT_ID}`]);


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
