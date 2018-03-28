import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "../services/cart.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
	id: Number
	product: any
  inCart: boolean

  constructor(private route: ActivatedRoute, private productDetails: ProductDetailsService, private cartService: CartService) { 
   	this.route.params.subscribe(params => {
        this.id = params['id'];
        this.productDetails.getProduct(this.id).subscribe((data)=>{
        	this.product = data
        })
   	})

    this.cartService.getCart().subscribe((cart: Array<Object>)=>{
      cart.forEach(p=>{
        if (p['prodId']['_id']==this.id) {
           this.inCart = true
         } 
      })
    })
  }

  ngOnInit() {
  }

  addToCart(e){
  	this.cartService.AddToCart({prodId:this.product['_id'], quantity:1}).subscribe(p=>{
      console.log(p)
      this.inCart = true
    })
  }

}
