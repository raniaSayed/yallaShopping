import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sub-category-products',
  templateUrl: './sub-category-products.component.html',
  styleUrls: ['./sub-category-products.component.css']
})
export class SubCategoryProductsComponent implements OnInit {
	subCategory: String;
	products:any[];
  constructor(private route: ActivatedRoute) { 
//  	this.route.params.subscribe(params => {
  //     this.subCategory = params['subcategory'];
   //    this.products = [{name:"ppppppppp1", price:12, quantity:4, picture:"https://assets.servedby-buysellads.com/p/manage/asset/id/62491", desc:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}, {name:"ppppppppp1", price:12, quantity:4, picture:"https://assets.servedby-buysellads.com/p/manage/asset/id/62491", desc:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}];
 //	}
  }


  ngOnInit() {
  }

}
