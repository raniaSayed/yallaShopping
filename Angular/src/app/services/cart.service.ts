import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartService {

  httpOptions = {
  	headers: new HttpHeaders({'Content-Type':  'application/json'})
  }
  constructor(private http: HttpClient) { 
  }

  AddToCart(product){
    console.log(product)
    return this.http.post('https://localhost:9090/users/2/cart', JSON.stringify(product), this.httpOptions);
  }

  getCart(){
  	return this.http.get('https://localhost:9090/users/2/cart');
  }

  editCart(newCart){
    return this.http.put('https://localhost:9090/users/2/cart', JSON.stringify(newCart), this.httpOptions);
  }
  
  checkOut(cart){
    return this.http.post('https://localhost:9090/orders/cart', JSON.stringify(cart), this.httpOptions);
  }  
  deleteCart(){
  	return this.http.delete('https://localhost:9090/users/2/cart', this.httpOptions);
  }
}