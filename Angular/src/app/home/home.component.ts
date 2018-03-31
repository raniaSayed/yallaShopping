import { Component, OnInit } from '@angular/core';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import { TopProductsService } from '../services/top-products.service';
// import {  CategoryService  } from '../services/category.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories;
  private topPs: any;
  constructor(/*private categoryService: CategoryService*/private topProducts: TopProductsService,private slider: NgbCarousel) { 
    // this.categoryService.getAllCategoreis().subscribe(res =>{
    //   this.categories = res;
    // })
    this.slider.interval = 0;
    this.topProducts.getTopProducts().subscribe(res=>{
      this.topPs = res;
    })
  }
  ngOnInit() {
  }

}
