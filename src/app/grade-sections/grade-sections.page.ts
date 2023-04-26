import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-grade-sections',
  templateUrl: './grade-sections.page.html',
  styleUrls: ['./grade-sections.page.scss'],
})
export class GradeSectionsPage implements OnInit {

  //#region Public Variables
  gradesList : any = []
  gradeStandardList : any = []
  selectedGrade:number=0
  loaded = false
  counteryId:any
  selectedSatndard:any
  public progress = 0;
  gradeId:any;
  selectedElementsId:any=[]
  currentInfo:any
  //#endregion


  constructor(
    public router : Router,
    public toastController : ToastController,
    public viewService : ViewService,
    private activateRoute: ActivatedRoute,
    private loadingService : LoadingService,

  ) {
    // setInterval(() => {
    //   this.progress += 0.01;
    //   if (this.progress > 1) {
    //     setTimeout(() => {
    //       this.progress = 0;
    //     }, 1000);
    //   }
    // }, 50);
  
   }

  ngOnInit() {
    this.currentInfo = localStorage.getItem('currentInfo') || '';
    if(this.currentInfo){
      this.currentInfo = JSON.parse(this.currentInfo);
    }
    this.counteryId=this.activateRoute.snapshot.params['cid'];
    this.gradeId=this.activateRoute.snapshot.params['gid'];

    // console.log(this.counteryId , this.gradeId );
    
    this.getGradeByCountryId(this.counteryId)
  }

  
  getGradeByCountryId(id:any){
    this.loaded =false;
    this.viewService.GetGradeByCountryId(id).then((res:any) =>{
      this.loaded =true;
        this.gradesList = res.success.filter((x:any) => x.id == this.gradeId);
        if(this.gradesList){
          this.gradesList.forEach((element:any) => {
                  this.getGradeStandard(element.id)
          });
        }
    }).catch(err=>{
      this.loaded =true;
    })
  }


  setRow(id:any) {
    this.selectedGrade = id;
    // this.getGradeStandard(id)
  }

showGradeSpinner:boolean = false;
  getGradeStandard(id:any){
    this.showGradeSpinner =true;
    this.viewService.GetGradeStandard(id).then((res:any) =>{
      this.showGradeSpinner =false;
         this.gradeStandardList = res.success;
         console.log(this.gradeStandardList);
    }).catch(err=>{
      this.showGradeSpinner =false;
    })
  }

  setSelectedElements(standradId:any  , elementId:any) {
    let isFound = this.selectedElementsId?.find((x :any)=>x.standradId == standradId)
    if(isFound){
      this.selectedElementsId =  this.selectedElementsId.filter((x : any)=> x.standradId !== standradId );
      this.selectedElementsId.push({standradId : standradId  , elementId : elementId});
    }else{
      this.selectedElementsId.push({standradId : standradId  , elementId : elementId});

    }
  }

  setSelectionStandard(id:any){
    return  this.selectedElementsId.some((a:any)=>a.elementId == id)
  }


  storeStudentInfo(){
    this.viewService.StoreStudentInfo(this.counteryId , this.selectedGrade , this.selectedElementsId).then((res:any)=>{
      localStorage.setItem('currentInfo' , JSON.stringify(res.data))
          //  const storedData = localStorage.getItem('userAuth') || '';
          //   const userAuth = JSON.parse(storedData);
          //  userAuth['studentInfo'].push(res.data);
          const storedData = localStorage.getItem('userAuth') || '';
          const userAuth = storedData ? JSON.parse(storedData) : {};
          userAuth['studentInfo'] = userAuth['studentInfo'] || []; // initialize as an empty array if undefined
          userAuth['studentInfo'].push(res.data);
          localStorage.setItem('userAuth', JSON.stringify(userAuth));


      this.router.navigate([`/subjects/${res.data.info_Id
      }/${res.data.grade_Id }`]);

    }).catch((err:any) =>{
      this.loadingService.presentToastWithOptions(err.error.message)
    })
  }
}
