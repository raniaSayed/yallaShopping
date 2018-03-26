import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Headers, RequestOptions,Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// JSON.stringify(userData)
@Injectable()
export class AuthServiceService {
public test = "hii";
  constructor(private http : HttpClient) {}

    getUserToken(userData : any){
      // return "hello";
      // return userData;
    console.log(userData);
    const httpOptions={
      headers : new HttpHeaders({'Content-Type':  'application/json'})
    }
    // let headers = new Headers({'Content-Type':  'application/json'});
    return this.http.post('http://localhost:9090/auth/tokens',userData );

    }
  }
