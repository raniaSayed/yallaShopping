import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  searchWord: string;
  matchedProducts;
  categories;
  categoryNames = {};
  selectedCategories = [];
  saveUsername: boolean;

  pageCount = 0;
  pages = [];
  totalCount = 0;
  low = 1;
  high = 10000;
  pageNumber = 1;

  constructor(private productDetailsService: ProductDetailsService,
    private categoryService: CategoryService) {
    //get matched search products
    //console.log(this.productDetailsService.myMethodSubject.getValue());
    this.productDetailsService.myMethod$.subscribe(res => {

      productDetailsService.getMatchedProductData(res,this.pageNumber,5)
        .subscribe(data => {
          this.matchedProducts = data;
          //get total count of results
          productDetailsService.getMatchedProductDataCount(res)
          .subscribe(count => {
            this.totalCount = parseInt(count.toString());
            this.updatePagging(count);
          });
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

  updatePagging(count) {
   
    
    console.log("totalCount = " + this.totalCount)
    this.pageCount = Math.ceil(count / 5);
    console.log(this.pageCount);
    this.pages = Array(this.pageCount).fill(1).map((x, i) => i + 1); // [1,2,3,4,5]
  }
  changePageNumber(i) {
    this.pageNumber = i;
    console.log("page Number = "+this.pageNumber);

    this.productDetailsService.getFilteredProductData(this.low, this.high,
      this.selectedCategories,this.pageNumber,5)
     .subscribe(res => { 
       this.matchedProducts = res;
       //this.updatePagging();

       console.log("count = "+this.pages) 

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
    this.productDetailsService.getFilteredProductData(this.low, this.high,
      this.selectedCategories, this.pageNumber, 5)
      .subscribe(res => {
        this.matchedProducts = res;

        this.productDetailsService.getFilteredProductDataCount(this.low, this.high,
          this.selectedCategories)
            .subscribe(count => {
              console.log("cooooount"+count);
              this.totalCount = parseInt(count.toString());
              console.log("total cooooount"+this.totalCount);
              
              this.updatePagging(count);
            });
       // this.updatePagging();

        console.log("count = " + this.pages)

      });

  }
  highChange() {
    console.log("highChange");
    this.matchedProducts = [];


    this.productDetailsService.getFilteredProductData(this.low, this.high,
      this.selectedCategories,this.pageNumber,5)
     .subscribe(res => { 
       this.matchedProducts = res;

       this.productDetailsService.getFilteredProductDataCount(this.low, this.high,
        this.selectedCategories)
          .subscribe(count => {
            console.log("cooooount"+count);
            this.totalCount = parseInt(count.toString());
            console.log("total cooooount"+this.totalCount);
            
            this.updatePagging(count);
          });
     });

  }
  lowChange() {
    this.matchedProducts = [];

    this.productDetailsService.getFilteredProductData(this.low, this.high,
      this.selectedCategories,this.pageNumber,5)
     .subscribe(res => { 
       this.matchedProducts = res;

       this.productDetailsService.getFilteredProductDataCount(this.low, this.high,
        this.selectedCategories)
          .subscribe(count => {
            console.log("cooooount"+count);
            
            this.totalCount = parseInt(count.toString());
            
            this.updatePagging(count);
            console.log(this.pageCount);
            
          });
     });

  }
}
