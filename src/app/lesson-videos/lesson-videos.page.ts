import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ToastController   } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { ViewService } from '../services/view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-videos',
  templateUrl: './lesson-videos.page.html',
  styleUrls: ['./lesson-videos.page.scss'],
})
export class LessonVideosPage implements OnInit , OnDestroy  {
  public lessonsList :any= []
  subjectID:any;
  cateID:any;
  lessonData:any
  loaded = false;
  private subscription!: Subscription;
  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    public generalService : GeneralService,
  ) { }

  ngOnInit() {
    // let info = localStorage.getItem('currentInfo') || '';
    // this.currentUserInfo = JSON.parse(info);
    this.subjectID=this.activateRoute.snapshot.params['sid'];
    this.cateID=this.activateRoute.snapshot.params['cid'];
    this.getVideoLinks()
    console.log(2);
    this.subscription = this.generalService.selectedLessonVideoData.subscribe((value:any) => {
      this.lessonData = value;
    });
    
  }




  getVideoLinks(){
    this.loaded =  false;
   this.viewService.GetVideoLinks(this.subjectID , this.cateID).then((res : any) => {
       this.loaded =  true;
       this.lessonsList = res.data;
   }).then(err=>{
      this.loaded =  true;

   })
  }

  ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }


  goToVideo(item:any){
    this.generalService.setVideoLink(item)
      this.router.navigate([`/show-video`])

  }



}
