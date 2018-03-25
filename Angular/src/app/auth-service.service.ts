import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthServiceService {
public test = "hii";
  constructor(private http:HttpClient) {}

    getUserToken(userData : any){
      // return "hello";
      // return userData;
    console.log(userData);
    let headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http.post('localhost:9090/auth/tokens', JSON.stringify(userData),{headers: headers});

    }
  }
