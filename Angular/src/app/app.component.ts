import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {  CategoryService  } from './services/category.service';

import { CartService } from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  isActive:boolean;
  categories:any[];
  
  constructor(private categoryService:CategoryService) { 
    //console.log()
    this.isActive = false;

    this.categoryService.getAllCategoreis().subscribe((res) => {
      this.categories = res;
    });

  }
  collapse(){
    //toggle isActive class
    this.isActive = !this.isActive 
  }
}
