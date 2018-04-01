import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "../services/cart.service";
import { RateService } from "../services/rate.service";
import { AuthServiceService } from '../services/auth-service.service';



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
  avg: number;
  userRate: Number;
  currentUser;
  constructor(private route: Router, private AuthService: AuthServiceService, private router: ActivatedRoute, private productDetails: ProductDetailsService, private cartService: CartService, private rateService: RateService) {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.productDetails.getProduct(this.id).subscribe((data) => {
        this.product = data;
        console.log(this.product);

      })
      this.AuthService.currentUser.subscribe(res => {
        this.currentUser = res;
      })
    })

    this.cartService.getCart().subscribe((cart: any) => {
      if (cart.cart.length > 0) {
        cart.cart.forEach(p => {
          if (p['prodId']['_id'] == this.id) {
            this.inCart = true
          }
        })
      }
    })
  }

  getAvgRate() {
    this.rateService.sendDataToServer(this.id).subscribe((res) => {
      this.avg = res['rate'];
    });

  }

  getRateUser() {
    if (this.currentUser.isAuthenticated) {


      this.rateService.sendDataToServer2(this.id).subscribe((res) => {
        this.userRate = res['rate'];
        // console.log("hi");
        console.log(this.userRate);
        // console.log(this.avg);
        console.log("HELLO");

      });
    }

  }

  editRate() {
    this.rateService.sendDataToServer3(this.id, this.userRate).subscribe((res) => {
      // this.userRate=res;
      console.log(this.userRate)
      // console.log(this.productData)
      // console.log(this.productData);

    });

  }

  rateProduct() {
    this.editRate();
  }

  ngOnInit() {
    this.getAvgRate();
    // this.getRateUser();
  }

  addToCart(e) {
    console.log(e)
    this.cartService.AddToCart({ prodId: this.product['_id'], quantity: 1 }).subscribe((p) => {
      this.inCart = true
    }, err => {
      if (!err.error.success) {
        this.route.navigate(['users/login'])
      }
    })
  }

}
