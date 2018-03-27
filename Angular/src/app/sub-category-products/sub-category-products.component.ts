import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryProductService } from '../services/sub-category-product.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-sub-category-products',
  templateUrl: './sub-category-products.component.html',
  styleUrls: ['./sub-category-products.component.css']
})
export class SubCategoryProductsComponent implements OnInit {
	subCategory: String;
	category: Number;
	products:any[];
  constructor(private route: ActivatedRoute, private subCategoryProducts: SubCategoryProductService) { 
   	this.route.params.subscribe(params => {
        this.subCategory = params['subcategory'];
        this.category = params['category'];
        this.subCategoryProducts.getProducts(this.category, this.subCategory).subscribe((data: Array<Object>)=>{
        	this.products = data
        })
   	})
  }


  ngOnInit() {
  
  }

}