import { Component, OnInit } from '@angular/core';
import { OrdersSellerService } from '../services/orders-seller.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-orders-seller',
  templateUrl: './orders-seller.component.html',
  styleUrls: ['./orders-seller.component.css']
})
export class OrdersSellerComponent implements OnInit {

  ordersSeller: Object;
  stars: number[];
  id: number;
  totalCount = 0;
  pageNumber = 1;
  limit = 5;
  pages = [];



  constructor(private route: ActivatedRoute, private ordersSellerService: OrdersSellerService) {
    this.route.params.subscribe(
      params => this.id = params['id']
    )
  }

  changePageNumber(i) {
    this.pageNumber = i;
    console.log("page Number = " + this.pageNumber);

    this.ordersSellerService.getOrdersOfSeller(this.id, this.pageNumber, this.limit).subscribe(
      ordersSeller => {
        this.ordersSeller = ordersSeller;
        this.ordersSellerService.getOrdersOfSellerCount(this.id).subscribe(
          count => {
            this.totalCount = count;
            var pageCount = this.totalCount/this.limit;
            this.pages = Array(pageCount).fill(1).map((x, i) => i + 1); // [1,2,3,4,5]

          });
      }
    );
  }
  fillStars(n) {
    this.stars = Array(n).fill(1);
    return this.stars;
  }

  ngOnInit() {
    this.ordersSellerService.getOrdersOfSeller(this.id, this.pageNumber, this.limit).subscribe(
      ordersSeller => {
        this.ordersSeller = ordersSeller;
        console.log(this.ordersSeller);
      }
    );
  }

}
