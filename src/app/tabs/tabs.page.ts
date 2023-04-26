import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  currentInfo : any
  constructor( public router: Router) { }


  ngOnInit() {
    this.currentInfo = localStorage.getItem('currentInfo') || '';
    if(this.currentInfo ){
      this.currentInfo = JSON.parse(this.currentInfo);
    }

    
    }
  


  toSubjects(){
    this.currentInfo = localStorage.getItem('currentInfo') || '';
    if(this.currentInfo ){
      this.currentInfo = JSON.parse(this.currentInfo);
    }
    this.router.navigate([`/subjects/${this.currentInfo.info_Id
    }/${this.currentInfo.grade_Id }`]);
  }
}
