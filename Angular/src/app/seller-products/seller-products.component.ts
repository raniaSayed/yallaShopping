import { Component, OnInit } from '@angular/core';
import { GetSellerProductsService } from '../get-seller-products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})

export class SellerProductsComponent implements OnInit {
  private sellerId: Number;
  private products: any;

  constructor(private route: ActivatedRoute, private getSellerProducts: GetSellerProductsService) {
    this.route.params.subscribe(params => {
      this.sellerId = params["id"];
      console.log(this.sellerId);
      this.getProducts(this.sellerId);

    })
   }

  getProducts(sellerId){
    this.getSellerProducts.getProductsBySellerId(sellerId).subscribe(res =>{
      if(res){
        this.products = res;
        console.log(res);
      }else{
        this.products = "No Products for this Seller";
      }
      console.log(this.products);


    })
  }

  ngOnInit() {
  }

}
