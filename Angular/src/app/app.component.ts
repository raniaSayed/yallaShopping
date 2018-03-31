import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ProductDetailsService } from './services/product-details.service';
import { Router } from '@angular/router';
import { CartService } from "./services/cart.service";
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent {
  title: "yalla souq";

  isActive: boolean;
  categories: any[];
  searchWord: string;
  matchedProducts;
  currentUser;

  constructor(private AuthService: AuthServiceService, private route: Router, private categoryService: CategoryService, private productDetailsService: ProductDetailsService) {
    this.AuthService.currentUser.subscribe(res => {
      this.currentUser = res;
    })
    this.isActive = true;
    this.categoryService.getAllCategoreis().subscribe((res) => {
      this.categories = res;
    });


  }
  collapse() {
    //toggle isActive class
    this.isActive = !this.isActive
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('x-access-token');
    var auth = false
    this.AuthService.user.next({ isAuthenticated: auth })
    this.route.navigate([''])

  }

  searchSubmit() {
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
