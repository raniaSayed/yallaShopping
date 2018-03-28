import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart.service";

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cart: any
  tempCart: any
  constructor(private cartService: CartService) { 
  	this.cartService.getCart().subscribe(data=>{
  		this.cart = data
  		this.tempCart = data
  	})
  }

  ngOnInit() {
  	
  }

  editCart(e){
  	this.tempCart = JSON.parse(JSON.stringify(this.cart))
  	this.tempCart.map(p=>p.prodId=p.prodId._id)
  	clearTimeout(reqDebounce)
  	var reqDebounce = setTimeout(()=>{
  		this.cartService.editCart(this.tempCart).subscribe(res=>{
  			console.log(res)
  		})
  	},500)



  }
  checkOut(e){
  	console.log(e)
  }
}
