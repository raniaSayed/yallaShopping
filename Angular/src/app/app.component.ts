import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {  CategoryService  } from './services/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
//  template:` <ul >
//  <li *ngFor="let t of nums">
//   <span >{{t}}</span>
//  </li>
// </ul>`, 
//template:""
 styleUrls: ['./app.component.css'] 

})
export class AppComponent {

  isActive:boolean;
  categories:any[];
  
  constructor(private categoryService:CategoryService) { 
    //console.log()
    this.isActive = false;

    this.categoryService.getAllCategoreis().subscribe((res) => {
      this.categories = res;
      console.log("hello");

      console.log(this.categories);
    });

  }
  collapse(){
    //toggle isActive class
    this.isActive = !this.isActive 
  }
}
