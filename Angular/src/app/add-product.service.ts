import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AddProductService {

  constructor(private http: HttpClient) { }

  sendDataToServer(userData){
    console.log(userData);

    // return userData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post('http://localhost:9090/products/', JSON.stringify(userData), httpOptions);
  }
}
