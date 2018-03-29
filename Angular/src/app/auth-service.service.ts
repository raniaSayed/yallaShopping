import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Headers, RequestOptions,Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthServiceService {
  public user = new BehaviorSubject<Object>({});
  public currentUser = this.user.asObservable();
  constructor(private http : HttpClient) {
    this.checkToken().subscribe(res=>{
      if (res['isAuthenticated']) {
        this.user.next(res['user'])
       }
    })
  }
    httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : ""
      })
    }
    getUserToken(userData : any){
      // return "hello";
      // return userData;
    console.log(userData);

    // let headers = new Headers({'Content-Type':  'application/json'});
    return this.http.post('https://localhost:9090/auth/tokens',userData );

    }

  signIn(data){
    return this.http.post('https://localhost:9090/auth/users', JSON.stringify(data), this.httpOptions);
  }  

  checkToken(){
    return this.http.post('https://localhost:9090/auth/check', "" ,this.httpOptions);
  }
}
