import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class OrdersSellerService {

  constructor(public http: HttpClient) { 
    
  }


  headersFactory = ()=> {
    return { headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : ""
      })
    }
  }

  getOrdersOfSeller(id,page,limit){
    return this.http.get(`https://localhost:9090/orders/sellers/${id}?page=${page}&limit=${limit}`, this.headersFactory())
  }
  getOrdersOfSellerCount(id){
    return this.http.get(`https://localhost:9090/orders/sellers${id}/count`,this.headersFactory());
}

  getOrderById(id) {
    return this.http.get(`https://localhost:9090/orders/${id}`, this.headersFactory())
  }

  changeOrderStatus(id, status) {
    return this.http.put('https://localhost:9090/orders', {id,status}, this.headersFactory())
  }

}