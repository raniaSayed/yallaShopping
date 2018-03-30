import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ProductDetailsService {
  public myMethod$: any;
  public myMethodSubject = new BehaviorSubject<any>({});
  httpOptions = {
  	headers: new HttpHeaders({'Content-Type':  'application/json'})
  }

  constructor(private http: HttpClient,private router: Router) { 
   
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  getProduct(id){
	  return this.http.get(`https://localhost:9090/products/${id}`)
  }  

  navigateToSearchComponent(searchWord){
    this.myMethodSubject.next(searchWord);
    this.router.navigate(['products/search']);
  }

  getFilteredProductData(lowPrice,highPrice,subcategories,page,limit){
    var obj = {
      "subcatArr": subcategories,
      "priceLow":lowPrice,
      "priceHigh":highPrice
    };
    return this.http.post(`https://localhost:9090/products/filter?page=${page}&limit=${limit}`,JSON.stringify(obj),this.httpOptions);

  }

  getFilteredProductDataCount(lowPrice,highPrice,subcategories){
    
    var obj = {
      "subcatArr": subcategories,
      "priceLow":lowPrice,
      "priceHigh":highPrice
    }
    return this.http.post(`https://localhost:9090/products/filter/count`,JSON.stringify(obj),this.httpOptions);
  }

  getMatchedProductData(searchWord,page,limit){
    return this.http.get(`https://localhost:9090/products/search?q=${searchWord}&page=${page}&limit=${limit}`);
  }

  getMatchedProductDataCount(searchWord){
    return this.http.get(`https://localhost:9090/products/search/count?q=${searchWord}`);
  }

}
