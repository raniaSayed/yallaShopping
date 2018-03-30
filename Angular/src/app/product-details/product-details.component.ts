import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "../services/cart.service";
// import {RatingModule} from "ngx-rating";
import { RateService } from "../services/rate.service";
import { AuthServiceService } from '../auth-service.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
	id: Number
	product: any
  inCart: boolean
  product_id: any;
  avg : any;
  
  constructor(private AuthService: AuthServiceService, private route: ActivatedRoute, private productDetails: ProductDetailsService, private cartService: CartService ,private rateService:RateService) {
   	this.route.params.subscribe(params => {
        this.id = params['id'];
        this.productDetails.getProduct(this.id).subscribe((data)=>{
          this.product = data;
          console.log(this.product);

        })
        this.AuthService.currentUser.subscribe(p=>console.log(p))
   	})

    this.cartService.getCart().subscribe((cart: any)=>{
      if (cart.length>0) {
        cart.forEach(p=>{
          if (p['prodId']['_id']==this.id) {
             this.inCart = true
           }
        })
      }
    })
  }

  getAvgRate(){

    this.product_id=2;
    this.rateService.sendDataToServer(this.product_id).subscribe((res)=> {
      this.avg=res;
       // console.log(res);
       console.log(this.avg);

});

  }


  ngOnInit() {
    this.getAvgRate();
  }

  addToCart(e){
  	this.cartService.AddToCart({prodId:this.product['_id'], quantity:1}).subscribe(p=>{
      this.inCart = true
    })
  }

}
