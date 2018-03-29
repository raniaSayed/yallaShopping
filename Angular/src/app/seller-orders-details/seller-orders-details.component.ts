import { Component, OnInit } from '@angular/core';
import { OrdersSellerService } from '../services/orders-seller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-orders-details',
  templateUrl: './seller-orders-details.component.html',
  styleUrls: ['./seller-orders-details.component.css']
})
export class SellerOrdersDetailsComponent implements OnInit {

  order: Object;
  id: number;
  selectedValue: string;

  constructor(private route: ActivatedRoute, private ordersSellerService: OrdersSellerService) {
    this.route.params.subscribe(
      params => this.id = params['order_id']
    )
  }

  handleChangeStatus(){
    this.ordersSellerService.changeOrderStatus(this.id, this.selectedValue).subscribe();
  }

  ngOnInit() {
    this.ordersSellerService.getOrderById(this.id).subscribe(
      order => {
        this.order = order;
      }
    );
  }

}
