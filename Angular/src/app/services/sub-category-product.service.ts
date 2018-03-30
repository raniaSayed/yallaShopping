import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubCategoryProductService {

  constructor(private http: HttpClient) { 

  }

  getProducts(id, subcategory){
	  return this.http.get(`https://localhost:9090/categories/${id}/${subcategory}`)
  }

}
