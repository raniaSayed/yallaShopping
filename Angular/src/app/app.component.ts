import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {  CategoryService  } from './services/category.service';
import { ProductDetailsService } from './services/product-details.service';

import { CartService } from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  isActive:boolean;
  categories:any[];
  searchWord:string;
  matchedProducts;
  
  constructor(private categoryService:CategoryService,private productDetailsService:ProductDetailsService) { 
    this.isActive = true;

    this.categoryService.getAllCategoreis().subscribe((res) => {
      this.categories = res;
      console.log(res)
    });


  }
  collapse(){
    //toggle isActive class
    this.isActive = !this.isActive 
  }
  searchSubmit(){
    //console.log("Submiteeeed");
    //send request to get products
    console.log(this.searchWord);
    this.productDetailsService.navigateToSearchComponent(this.searchWord);
   /* .subscribe(res => {
      this.matchedProducts = res;
      console.log(this.matchedProducts);
    }
    );*/
    
  }
}
