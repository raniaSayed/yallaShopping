import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent  {
  searchWord: string;
  matchedProducts;
  categories;
  categoryNames = {};
  selectedCategories = [];
  saveUsername: boolean;
  low = 1;
  high = 10000;

  constructor(private productDetailsService: ProductDetailsService,
    private categoryService: CategoryService) {
    //get matched search products
    //console.log(this.productDetailsService.myMethodSubject.getValue());
    this.productDetailsService.myMethod$.subscribe(res => {

      productDetailsService.getMatchedProductData(res).subscribe(data => {
        this.matchedProducts = data;
      });
    });

    //get all categories and subcategories
    this.categoryService.getAllCategoreis().subscribe(res => {
      this.categories = res;
      this.categories.forEach(element => {
        this.categoryNames[element] = false;
      });

    });
  }
  change(subcategory) {

    //change state  
    this.categoryNames[subcategory] = !this.categoryNames[subcategory];

    //send request to get products

    this.selectedCategories = [];


    //insert selected subcategory names
    Object.keys(this.categoryNames)
      .filter(i => this.categoryNames[i] == true ? this.selectedCategories.push(i) : "");

    this.matchedProducts = [];
    this.productDetailsService.getFilteredProductData(this.low, this.high, this.selectedCategories)
      .subscribe(res => { this.matchedProducts = res });

  }
  highChange() {
    console.log("highChange");
    this.matchedProducts = [];


    this.productDetailsService.getFilteredProductData(this.low, this.high, this.selectedCategories)
      .subscribe(res => { this.matchedProducts = res });

  }
  lowChange() {
    this.matchedProducts = [];

    this.productDetailsService.getFilteredProductData(this.low, this.high, this.selectedCategories)
      .subscribe(res => { this.matchedProducts = res });

  }
}
