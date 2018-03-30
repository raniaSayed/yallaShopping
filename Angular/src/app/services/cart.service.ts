import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) { 
  }

  headersFactory(){
    return { headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : ""
      })
    }
  }

  AddToCart(product){
    console.log(product)
    return this.http.post('https://localhost:9090/users/2/cart', JSON.stringify(product), this.headersFactory());
  }

  getCart(){
  	return this.http.get('https://localhost:9090/users/2/cart', this.headersFactory());
  }

  editCart(newCart){
    return this.http.put('https://localhost:9090/users/2/cart', JSON.stringify(newCart), this.headersFactory());
  }
  
  checkOut(cart){
    return this.http.post('https://localhost:9090/orders/cart', JSON.stringify(cart), this.headersFactory());
  }  
  deleteCart(){
  	return this.http.delete('https://localhost:9090/users/2/cart', this.headersFactory());
  }
}