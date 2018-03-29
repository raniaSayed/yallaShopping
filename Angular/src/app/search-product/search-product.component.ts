import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import { CategoryService } from '../services/category.service';
 
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  searchWord:string;
  matchedProducts;
  categories;

  constructor(private productDetailsService:ProductDetailsService,private categoryService:CategoryService) {
    //get matched search products
    this.productDetailsService.myMethod$.subscribe(res => {
      productDetailsService.getMatchedProductData(res).subscribe(data => 
        {
          this.matchedProducts = data;
          console.log(this.matchedProducts);
        });
    });

    //get all categories and subcategories
    this.categoryService.getAllCategoreis().subscribe(res =>{
      this.categories = res;
    });
   }

  ngOnInit() {
  }

}
