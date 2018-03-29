import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart.service";
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cart = []
  tempCart: any
  stockErr: boolean
  constructor(private cartService: CartService, private AuthService: AuthServiceService) { 
  	this.cartService.getCart().subscribe(data=>{
  		this.cart = data['cart']
      this.tempCart = JSON.parse(JSON.stringify(this.cart))
  	})
  }

  ngOnInit() {
      console.log(this.AuthService.currentUser.subscribe(p=>console.log(p)))
  }

  editCart(e, i){
    console.log(e.target.value, this.cart[0], i)
    this.cart[i].quantity = parseInt(e.target.value)
  	this.tempCart = JSON.parse(JSON.stringify(this.cart))
  	this.tempCart.map(p=>p.prodId=p.prodId._id)
		this.cartService.editCart(this.tempCart).subscribe(res=>{
      console.log(JSON.stringify(this.cart) === JSON.stringify(res['cart']))
      this.cart = res['cart']
	  })
  }

  checkOut(e){
    console.log(this.tempCart)
    this.cartService.editCart(this.tempCart).subscribe(res=>{
      console.log(JSON.stringify(this.cart) === JSON.stringify(res['cart']))
      if (JSON.stringify(this.cart) === JSON.stringify(res['cart'])) {
        // add order here
        console.log("checked")
      }else{
        this.cart = res['cart']
        this.stockErr = true
      }
    })
  }

  removeFromCart(e, i){
    this.cart.splice(i,1)
    this.cartService.editCart(this.cart).subscribe(res=>{
        console.log(res)
      })
  }
}
