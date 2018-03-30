import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class RateService {

  constructor(private http: HttpClient) { }

  sendDataToServer(id){
    console.log(id);

    // return userData;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   }
  //   return this.http.get(`https://localhost:9090/products/${id}/avg`, httpOptions);
  // }
}
}
