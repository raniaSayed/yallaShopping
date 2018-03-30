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
  id: number;

  constructor(private route: Router, private router: ActivatedRoute, private ordersSellerService: OrdersSellerService) {
    this.router.params.subscribe(
      params => this.id = params['id']
    )
  }
  
  fillStars(n) {
    this.stars = Array(n).fill(1);
    return this.stars;
  }
  
  ngOnInit() {
    this.ordersSellerService.getOrdersOfSeller(this.id).subscribe(
      ordersSeller => {
        this.ordersSeller = ordersSeller;
        console.log(this.ordersSeller);
      }, err => {
        if(!err.error.success){
          this.route.navigate(['users/login'])
        }
      }
    )
  }

}
