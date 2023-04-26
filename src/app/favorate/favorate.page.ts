import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-favorate',
  templateUrl: './favorate.page.html',
  styleUrls: ['./favorate.page.scss'],
})
export class FavoratePage implements OnInit {
//#region  Public Variables
public FavoratesVideosList:any=[]
//#endregion



  constructor(  
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    public generalService : GeneralService,) { }

  ngOnInit() {
    this.GetFavoratesVideos();
  }


  GetFavoratesVideos(){
    this.viewService.GetFavoratesVideos().then((res:any)=>{
       this.FavoratesVideosList = res.data
    }).catch(err=>{

    })
  }

}
