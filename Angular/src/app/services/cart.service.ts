import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {

  private cart = new BehaviorSubject<Array<Object>>([{prodId:0, quantity:1}])
  currentCart = this.cart.asObservable();

  constructor() { 
  	console.log(this.cart.getValue())
  }

  changeCart(product) {
  	var temp = JSON.parse(JSON.stringify(this.cart.getValue()))
  	var exist = false
  	var length = temp.length
  	for (var i = 0; i < length; i++) {
  		if(temp[i].prodId == product.prodId){
  			temp[i].quantity += 1
  			exist = true
  		}
  	}
  	if (!exist) {
  		temp.push(product)
  	}
    this.cart.next(temp)
  	console.log(temp)
  }
}