import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor() { }

  // private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('Initial Value');


  private subjectInfo : 
  BehaviorSubject<any> = new BehaviorSubject<any>({subjectName :  'المادة' , subjectImage:'assets/images/lessons-img.png'});
  selectedSubjectName = this.subjectInfo.asObservable();

  private lessonVideoData: 
  BehaviorSubject<any> = new BehaviorSubject<any>({subjectName :  'الدرس' , subjectImage:'assets/images/lessons-img.png'});
  selectedLessonVideoData = this.lessonVideoData.asObservable();

  private videoLink: 
  BehaviorSubject<any> = new BehaviorSubject<any>({video_title :  'الفديو' , video_link:''});
  selectedvideoLink = this.videoLink.asObservable();

  private homeData = new BehaviorSubject<any>(false);
  sharedHomeData = this.homeData.asObservable();

  setSubjectName(subject: any) {
    this.subjectInfo.next(subject);
  }
  setLessonVideoData(lesson: any) {
    this.lessonVideoData.next(lesson);
  }
  setVideoLink(link: any) {
    this.videoLink.next(link);
  }
  setData(data: any) {
    this.homeData.next(data);
  }
}

