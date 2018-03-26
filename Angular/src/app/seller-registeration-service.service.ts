import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SellerRegisterationServiceService {

  constructor(private http: HttpClient) { }

  sendDataToServer(sellerData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post('http://localhost:9090/sellers/', JSON.stringify(sellerData), httpOptions);
  }

}
