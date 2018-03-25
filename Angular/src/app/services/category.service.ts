import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class CategoryService {

  constructor(private http:Http) { }
  getAllCategoreis(){
    return this.http.get("http://localhost:9090/categories").map(res => res.json());

  }
}
