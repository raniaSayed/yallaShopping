import { Component, OnInit } from '@angular/core';
import {  CategoryService  } from '../services/category.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories;
  constructor(private categoryService: CategoryService) { 
    this.categoryService.getAllCategoreis().subscribe(res =>{
      this.categories = res;
    })
  }
  hover(){
    console.log("kkkkk");
    
  }

  ngOnInit() {
  }

}
