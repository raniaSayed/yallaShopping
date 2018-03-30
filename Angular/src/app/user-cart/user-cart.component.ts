import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart.service";
import { AuthServiceService } from '../services/auth-service.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cart = []
  tempCart: any
  stockErr: boolean
  isLoaded: boolean
  constructor(private route: Router, private cartService: CartService, private AuthService: AuthServiceService) { 
    AuthService.currentUser.subscribe(res=>{
      console.log(res)
      if (!res['isUser']) {
        route.navigate([''])
      }
    })

  	this.cartService.getCart().subscribe(data=>{
  		this.cart = data['cart']
      this.tempCart = JSON.parse(JSON.stringify(this.cart))
      this.isLoaded = true
  	})
  }

  ngOnInit() {
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
      this.cart.sort((a, b) =>{
          return a.prodId - b.prdoId;
      });
      res['cart'].sort((a, b) =>{
          return a.prodId - b.prdoId;
      });
      console.log(JSON.stringify(this.cart) === JSON.stringify(res['cart']))
      if (JSON.stringify(this.cart) === JSON.stringify(res['cart'])) {
        this.cartService.checkOut(this.cart).subscribe((result)=>{
          if (result['status']) {
            console.log("DONE")
            this.cartService.deleteCart().subscribe((delRes)=>{
              console.log(delRes['status'])
              this.cart = []
            })
          }
        })
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
