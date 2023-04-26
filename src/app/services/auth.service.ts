import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="http://app.schoopedia.com/api/"
  studentInfo: any;
  splashScreenVideoEnd : boolean = false;
  constructor(public http: HttpClient) { 

  }

//==============================================================================================
  login(form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var loginForm = new FormData();
    loginForm.append("email", form.email);
    loginForm.append("password", form.password);
    return this.http.post(this.apiUrl + "login" , loginForm , {headers} ).toPromise();
  }
//==============================================================================================
  Register(form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var registerForm = new FormData();
    registerForm.append("name", form.name);
    registerForm.append("email", form.email);
    registerForm.append("password", form.password);
    registerForm.append("password_confirmation", form.password_confirmation);
    return this.http.post(this.apiUrl + "register" , registerForm , {headers} ).toPromise();
  }
//==============================================================================================
  ForgetPassword(form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var forgetPasswordForm = new FormData();
    forgetPasswordForm.append("email", form.email);
    return this.http.post(this.apiUrl + "forget-password" , forgetPasswordForm , {headers} ).toPromise();
  }
//==============================================================================================
   ForgetCode (form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var forgetCodeForm = new FormData();
    forgetCodeForm.append("email", form.email);
    forgetCodeForm.append("forget_code", form.forget_code);
    return this.http.post(this.apiUrl + "forget-password/code" , forgetCodeForm , {headers} ).toPromise();
  }
//==============================================================================================
   ResetPassword (form:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var resetPassowrdForm = new FormData();
    resetPassowrdForm.append("email", form.email);
    resetPassowrdForm.append("new_password", form.new_password);
    return this.http.post(this.apiUrl + "forget-password/new-password" , resetPassowrdForm , {headers} ).toPromise();
  }
//==============================================================================================
   Logout () {
    let headers: HttpHeaders = new HttpHeaders();
    let token = localStorage.getItem('token')
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers = headers.append("Accept", `application/json`);
    return this.http.post(this.apiUrl + "logout" , {} , {headers} ).toPromise();
  }
//==============================================================================================


}
