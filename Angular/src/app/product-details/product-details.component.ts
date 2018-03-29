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
	id: Number;
	product: any

  constructor(private route: ActivatedRoute, private productDetails: ProductDetailsService, private cartService: CartService) { 
   	this.route.params.subscribe(params => {
        this.id = params['id'];
        this.productDetails.getProduct(this.id).subscribe((data)=>{
          this.product = data;
          console.log(this.product);
          
        })
   	})
  }

  ngOnInit() {
  }

  addToCart(e){
  	this.cartService.AddToCart({prodId:this.product['_id'], quantity:1}).subscribe(p=>console.log(p))
  }

}
