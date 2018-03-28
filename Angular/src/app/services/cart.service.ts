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
    return this.http.post('http://localhost:9090/users/1/cart', JSON.stringify(product), this.httpOptions);
  }

  getCart(){
  	return this.http.get('http://localhost:9090/users/1/cart');
  }

  editCart(newCart){
  	// console.log(JSON.stringify(newCart))
  	return this.http.put('http://localhost:9090/users/1/cart', JSON.stringify(newCart), this.httpOptions);
  }
}