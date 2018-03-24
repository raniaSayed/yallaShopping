import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthServiceService {
public test = "hii";
  constructor(private http:HttpClient) {}

    getUserToken(socialPlatform : any){
      // return socialPlatform;
    // console.log(userData);
      return this.http.get('localhost:9090/auth',socialPlatform)
                 .map((res)=>res.json());
                //  .then((res)=>res.json());

    }
  }
