import { Component, OnInit } from '@angular/core';
import { OrdersSellerService } from '../services/orders-seller.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-seller',
  templateUrl: './orders-seller.component.html',
  styleUrls: ['./orders-seller.component.css']
})
export class OrdersSellerComponent implements OnInit {

  ordersSeller: Object;
  stars: number[];
  p: number = 1;

  constructor(private route: Router, private router: ActivatedRoute, private ordersSellerService: OrdersSellerService) {
  }

  fillStars(n) {
    this.stars = Array(n).fill(1);
    return this.stars;
  }

  ngOnInit() {
    this.ordersSellerService.getOrdersOfSeller().subscribe(
      ordersSeller => {
        this.ordersSeller = ordersSeller;
      }, err => {
        if (!err.error.success) {
          this.route.navigate(['users/login'])
        }
      }
    )
  }

}
