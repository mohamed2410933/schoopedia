import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  apiUrl="http://app.schoopedia.com/api/"
  studentInfo: any;
  splashScreenVideoEnd : boolean = false;
  constructor(public http: HttpClient) { 


  }


  //==============================================================================================
  GetAllCountries() {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    return this.http.get(this.apiUrl + "get-countries" ,  {headers}).toPromise();
  }
//==============================================================================================
GetGradeByCountryId(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    return this.http.get(this.apiUrl + `get-grades?active=true&country_id=${id}` ,  {headers}).toPromise();
  }
//==============================================================================================
 ActivateAccount(form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", `application/json`);
    var activateForm = new FormData();
    activateForm.append("email", form.email);
    activateForm.append("active_code", form.active_code)
    return this.http.post(this.apiUrl + `active-account` , activateForm ,  {headers}).toPromise();
  }
//==============================================================================================
  GetGradeStandard(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    return this.http.get(this.apiUrl + `get-grade-standards?grade_id=${id}` ,  {headers}).toPromise();
  }
//==============================================================================================
  GetStudentSubject(studentId:any , gradeId:any) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    return this.http.get(this.apiUrl + `get/subject/${studentId} / ${gradeId}` ,  {headers}).toPromise();
  }
//==============================================================================================
  GetVideoLinks(subjectId:any , lesson_id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    // get-video-links
    return this.http.get(this.apiUrl + `get-video-links/${subjectId} / ${lesson_id}` ,  {headers}).toPromise();
  }
//==============================================================================================
  StoreStudentInfo(country_id : any , grade_id : any , ids:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", `application/json`);
    let token = localStorage.getItem('token')
    headers = headers.append("token", `${token}`);
    headers = headers.append("Authorization", `Bearer ${token}`);
    var studentInfo = new FormData();
    studentInfo.append("country_id", country_id);
    studentInfo.append("grade_id", grade_id);
    for (var j = 0; j < ids.length; j++) {
      let id = ids[j].elementId
      studentInfo.append('ids[]', id);
  }
    return this.http.post(this.apiUrl + `student/store-info` , studentInfo ,  {headers}).toPromise();
  }
 //==============================================================================================
 GetLessonsBySubjectId(id:any) {
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  return this.http.get(this.apiUrl + `subject/lesson/${id}` ,  {headers}).toPromise();
}
 //==============================================================================================
GetStudentCountryGrades(){
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  return this.http.get(this.apiUrl + `student/country-grades` ,  {headers}).toPromise();
}
//==============================================================================================
ChangeGrade(grade_id:any) {
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  var changeGrade = new FormData();
  changeGrade.append("grade_id", grade_id);
  return this.http.post(this.apiUrl + `student/change-grade` , changeGrade ,  {headers}).toPromise();
}
//==============================================================================================
StoreFavorateVideos(video_id:any) {
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  var video = new FormData();
  video.append("video_id", video_id);
  return this.http.post(this.apiUrl + `store-Favorites-videos` , video ,  {headers}).toPromise();
}
//==============================================================================================
GetFavoratesVideos() {
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  var video = new FormData();
  return this.http.get(this.apiUrl + `show-Favorites-videos`  ,  {headers}).toPromise();
}
//==============================================================================================
// DeleteFavorateVideos(video_id:any) {
//   let headers: HttpHeaders = new HttpHeaders();
//   let token = localStorage.getItem('token')
//   headers = headers.append("token", `${token}`);
//   headers = headers.append("Authorization", `Bearer ${token}`);
//   headers = headers.append("Accept", `application/json`);
//   var video = new FormData();
//   video.append("video_id", video_id);
//   return this.http.delete(this.apiUrl + `delete-Favorites-videos` , video  ,  {headers}).toPromise();
// }
// DeleteFavorateVideos(video_id: any) {
//   const token = localStorage.getItem('token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Accept': 'application/json'
//   });
//   return this.http.delete(`${this.apiUrl}delete-Favorites-videos?video_id=${video_id}`, { headers }).toPromise();
// }


DeleteFavorateVideos(video_id: any){
  const token = localStorage.getItem('token');
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }),
    body: { "video_id": video_id}
  };
  return this.http.delete(this.apiUrl + `delete-Favorites-videos` , httpOptions).toPromise();
}



//==============================================================================================
storeStudentVideosLog(title:any) {
  let headers: HttpHeaders = new HttpHeaders();
  let token = localStorage.getItem('token')
  headers = headers.append("token", `${token}`);
  headers = headers.append("Authorization", `Bearer ${token}`);
  headers = headers.append("Accept", `application/json`);
  var _title = new FormData();
  _title.append("title", title);
  return this.http.post(this.apiUrl + `store-student-videos-log`, _title ,  {headers}).toPromise();
}

}
