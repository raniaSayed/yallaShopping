import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersSellerService {
  // service name will be changed to OrdersSellerService

  constructor(public http: Http) { 
    
  }

  getOrdersOfSeller(id,page,limit){
    return this.http.get(`https://localhost:9090/orders/sellers/${id}?page=${page}&limit=${limit}`)
      .map(result => result.json());
  }

  getOrdersOfSellerCount(id){
    return this.http.get(`https://localhost:9090/orders/sellers${id}/count`)
      .map(result => result.json());
  }

  getOrderById(id) {
    return this.http.get(`https://localhost:9090/orders/${id}`)
      .map(result => result.json());
  }

  changeOrderStatus(id, status) {
    return this.http.put('https://localhost:9090/orders', {
      id,
      status
    });
  }

}
