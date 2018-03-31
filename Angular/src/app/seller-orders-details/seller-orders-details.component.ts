import { Component, OnInit } from '@angular/core';
import { OrdersSellerService } from '../services/orders-seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-seller-orders-details',
  templateUrl: './seller-orders-details.component.html',
  styleUrls: ['./seller-orders-details.component.css']
})
export class SellerOrdersDetailsComponent implements OnInit {

  order: Object;
  id: number;
  selectedValue: string;
  auth: any;

  constructor(private route: ActivatedRoute,private router: Router, private ordersSellerService: OrdersSellerService, private authServiceService: AuthServiceService) {
    this.route.params.subscribe(
      params => this.id = params['order_id']
    )
  }

  handleChangeStatus(){
    this.ordersSellerService.changeOrderStatus(this.id, this.selectedValue).subscribe();
  }

  ngOnInit() {
    this.authServiceService.checkToken().subscribe(res => {
      this.auth = res;
      if (this.auth.isAuthenticated){
        this.ordersSellerService.getOrderById(this.id).subscribe(
          order => {
            this.order = order;
          }
        );
      } else {
        this.router.navigate(['/users/login']);
      }
    });
  }

}
