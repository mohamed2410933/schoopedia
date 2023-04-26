import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { ViewService } from '../services/view.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.page.html',
  styleUrls: ['./show-video.page.scss'],
})
export class ShowVideoPage implements OnInit  , OnDestroy  {
  
  videoData: any;
  loaded = false;
  videoId:any
  formattedDate:any
  test : boolean = true
  private subscription!: Subscription;
  userAuth:any
  // safeSrc: SafeResourceUrl;
  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    public generalService : GeneralService,
    public sanitizer: DomSanitizer,
    private videoPlayer: VideoPlayer,
    private loadingService : LoadingService,
  ) {

    // this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/watch?v=-XnmNV3GZPw&list=PLsfUbz6qCVl7tme_ekmJB5jefNR2Wa6ND&index=5");
   }

  ngOnInit() {
    this.loaded = false  ; 
    this.subscription = this.generalService.selectedvideoLink.subscribe((value:any) => {
    this.loaded = true  ; 
      this.videoData = value;
      // this.videoId = value.VideoId?.split('_')[1]
      this.videoId = value.VideoId?.substring(3);
      console.log(this.videoData);
       this.formattedDate = this.formatDate(this.videoData?.reviewed_on);
      console.log(this.formattedDate); // Output: تاريخ 3 أبريل 2023
//       const myDate = new Date(this.videoData?.reviewed_on);
//  this.formattedDate = this.datePipe.transform(myDate, 'dd MMMM yyyy', 'ar');



      
    });

    let _userAuth = localStorage.getItem('userAuth') || '';
    if(_userAuth){
      this.userAuth = JSON.parse(_userAuth);
    }
    this.viewService.storeStudentVideosLog(`
    قام ${this.userAuth.name} 
    بمشاهدة ${this.videoData.video_title}`)
  }

 formatDate(dateString: string): string {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
} 




  comments= [
    {
      id: 1,
      author: "أحمد",
      text: "مقطع فيديو رائع جدًا. شكرًا على المشاركة!",
      avatarUrl: "https://www.w3schools.com/w3images/avatar2.png",
      date: "٢٣ مارس ٢٠٢٢"
    },
    {
      id: 2,
      author: "سميرة",
      text: "شكرًا جزيلًا على الفيديو المفيد",
      avatarUrl: "https://www.w3schools.com/w3images/avatar4.png",
      date: "٢٥ مارس ٢٠٢٢"
    },
    {
      id: 3,
      author: "ياسر",
      text: "جميل جدًا. أنا أحب هذا المقطع!",
      avatarUrl: "https://www.w3schools.com/w3images/avatar3.png",
      date: "٢٧ مارس ٢٠٢٢"
    }
  ]
  
  likeVideo() {
    // Add your like video logic here
    console.log('Liked video!');
  }

  isFavorited: boolean = false;

  toggleFavorite(id:any) {
    this.isFavorited = !this.isFavorited;
    this.isFavorited  ?  this.StoreFavorateVideos(id)  :  this.DeleteFavorateVideos(id)
  }

 


  ngOnDestroy() {
    
    if (this.subscription) {
      this.subscription.unsubscribe();
  }
}

stopVideo(){
  this.videoPlayer.close();
}


StoreFavorateVideos(id:any){
  this.viewService.StoreFavorateVideos(id).then((res:any)=>{
     this.loadingService.presentToastWithOptions('تم اضافه الفيديو الي المفضلة')
  }).catch((err) =>{

  })

}


DeleteFavorateVideos(id:any){
   this.viewService.DeleteFavorateVideos(id).then(res=>{
    this.loadingService.presentToastWithOptions('تم إزالة الفيديو من المفضلة');
   }).catch(err=>{

   })
}
}
