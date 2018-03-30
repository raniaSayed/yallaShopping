import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TopProductsService {

  constructor(private http: HttpClient) { }

  getTopProducts(){
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json'
      })
    }
    return this.http.get("https://localhost:9090/products/top", httpOptions);
  }

}
