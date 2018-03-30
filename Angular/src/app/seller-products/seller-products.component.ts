import { Component, OnInit } from '@angular/core';
import { GetSellerProductsService } from '../services/get-seller-products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})

export class SellerProductsComponent implements OnInit {
  private sellerId: Number;
  private products: any;
  totalCount = 0;
  pageNumber = 1;
  limit = 5;
  pages = [];

  constructor(private route: ActivatedRoute, private getSellerProducts: GetSellerProductsService) {
    this.route.params.subscribe(params => {
      this.sellerId = params["id"];
      console.log(this.sellerId);
      this.getProducts(this.sellerId);

    })
   }
   changePageNumber(i) {
    this.pageNumber = i;
    console.log("page Number = " + this.pageNumber);

    this.getSellerProducts.getProductsBySellerId(this.sellerId, this.pageNumber, this.limit).subscribe(
      ordersSeller => {
        this.getSellerProducts.getProductsBySellerIdCount(this.sellerId).subscribe(
          count => {
            this.totalCount = parseInt(count.toString());
            var pageCount = Math.ceil(this.totalCount/this.limit);
            this.pages = Array(pageCount).fill(1).map((x, i) => i + 1); // [1,2,3,4,5]

          });
      }
    );
  }
  getProducts(sellerId){
    this.getSellerProducts.getProductsBySellerId(sellerId,this.pageNumber, this.limit).subscribe(res =>{
      if(res){
        this.getSellerProducts.getProductsBySellerIdCount(sellerId).subscribe(
          count => {
            this.totalCount = parseInt(count.toString());
            var pageCount = Math.ceil(this.totalCount/this.limit);
            this.pages = Array(pageCount).fill(1).map((x, i) => i + 1); // [1,2,3,4,5]

          });
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
