import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class ProductDetailsService {
  public myMethod$: any;
  private myMethodSubject = new Subject<any>();

  constructor(private http: HttpClient,private router: Router) { 
   
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  getProduct(id){
	  return this.http.get(`http://localhost:9090/products/${id}`)
  }  
  addProduct(id){
	  return this.http.get(`http://localhost:9090/products/${id}`)
  }

  navigateToSearchComponent(searchWord){
    //this.http.get(`http://localhost:9090/products/search?q=${searchWord}`);
    this.myMethodSubject.next(searchWord);
    this.router.navigate(['products/search']);

  }
  getMatchedProductData(searchWord){
    return this.http.get(`http://localhost:9090/products/search?q=${searchWord}`);

  }
  

}
