import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class GetSellerProductsService {

  constructor(private http: HttpClient) { }

  getProductsBySellerId(sellerId){
    const httpOptions = new HttpHeaders({
      'Content-Type':  'application/json'
    });

    return this.http.get(`https://localhost:9090/products/seller/${sellerId}`)//.map(res => res.json());
  }

}
