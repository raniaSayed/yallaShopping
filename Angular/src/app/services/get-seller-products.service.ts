import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class GetSellerProductsService {

  constructor(private http: HttpClient) { }


  headersFactory = ()=> {
    return { headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : ""
      })
    }
  }

  getProductsBySellerId(sellerId,page,limit){
    return this.http.get(`https://localhost:9090/products/seller/${sellerId}?page=${page}&limit=${limit}`, this.headersFactory())//.map(res => res.json());
  }
  getProductsBySellerIdCount(sellerId){
    return this.http.get(`https://localhost:9090/products/seller/${sellerId}/count`, this.headersFactory())//.map(res => res.json());
  }

}
