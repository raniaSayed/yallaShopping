import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthServiceService {
public test = "hii";
  constructor(private http:HttpClient) {}

    getUserToken(socialPlatform : any){
      // return socialPlatform;
    // console.log(userData);
    let headers = new Headers({'Content-Type':  'application/json'});
    return this.http.post('http://localhost:9090/auth', JSON.stringify(socialPlatform),{headers: headers});

    }
  }
