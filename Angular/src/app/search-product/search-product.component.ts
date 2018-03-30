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
  categoryNames={};
  selectedCategories =[];
  saveUsername:boolean;
  low =1;
  high= 10000;

  constructor(private productDetailsService:ProductDetailsService,
              private categoryService:CategoryService) {
    //get matched search products
    console.log("1");
    console.log(this.productDetailsService.myMethodSubject.getValue());
    this.productDetailsService.myMethod$.subscribe(res => {
      console.log("2");

      productDetailsService.getMatchedProductData(res).subscribe(data => 
        {
          this.matchedProducts = data;
          console.log("Matched");
          console.log(this.matchedProducts);
        });
    });

    //get all categories and subcategories
    this.categoryService.getAllCategoreis().subscribe(res =>{
      this.categories = res;
      this.categories.forEach(element => {
        this.categoryNames[element] = false;
      });

    });
   }
   change(subcategory)
{ 

  //change state  
  this.categoryNames[subcategory] = !this.categoryNames[subcategory];
          
  //send request to get products
  
  this.selectedCategories=[];


    //insert selected subcategory names
    Object.keys(this.categoryNames)
    .filter(i => this.categoryNames[i]==true?this.selectedCategories.push(i) :"");
    console.log(this.low);
    console.log(this.high);
    
    this.productDetailsService.getFilteredProductData(this.low,this.high,this.selectedCategories)
    .subscribe(res=> console.log(res));
    
}
highChange(){
  console.log("highChange");
  
  this.productDetailsService.getFilteredProductData(this.low,this.high,this.selectedCategories)
    .subscribe(res=> console.log(res));
    
}
lowChange(){
  console.log("lowChange");

  this.productDetailsService.getFilteredProductData(this.low,this.high,this.selectedCategories)
    .subscribe(res=> console.log(res));
    
}
  ngOnInit() {
  }

}
