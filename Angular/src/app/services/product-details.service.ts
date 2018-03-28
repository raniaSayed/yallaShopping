import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductDetailsService {

  constructor(private http: HttpClient) { 
  
  }

  getProduct(id){
	  return this.http.get(`http://localhost:9090/products/${id}`)
  }

  getMatchedProduct(searchWord){
	  return this.http.get(`http://localhost:9090/products/search?q=${searchWord}`)
  }
  

}
