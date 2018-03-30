import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddProductService } from '../add-product.service';
import { CategoryService } from '../services/category.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private seller_id: number;
  private name: string;
  private price: number;
  private description: string;
  private stock: number;
  private picture: any;
  private categoryId: number;
  private subcategory: string;
  private serverErrors: string;
  private categoriesName: any;
  private subcategories: any;

  constructor(private catService: CategoryService,private AddProductService : AddProductService) {
    this.getCats();
   }

  fileUpload(files){
  console.log(files[0]);
  this.picture = files[0];
  var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(this.picture);
    myReader.onloadend = (e) => {
    this.picture = myReader.result;
    // console.log(this.picture)
  }
}

  getCats(){
    this.catService.getAllCategoreis().subscribe((res) => {
        this.categoriesName = res; 
      })
  }

  setSelectedCat(){
    console.log("k");
    
    this.categoriesName.forEach(cat => {
      if(cat._id == this.categoryId){
        this.subcategories = cat.subcategories; 
      }
    });
  }

  addProduct(){
    this.seller_id=2;
    this.AddProductService.sendDataToServer({
      'name': this.name,
      'price': this.price,
      'desc': this.description,
      'stock': this.stock,
      'picture': this.picture,
      'category':this.categoryId,
      'subcategory': this.subcategory,
      'seller_id': this.seller_id,
    }).subscribe((res)=> {
      console.log("hi")
       console.log(res)
});

  }



  submitIt(){
     console.log("submitFn");  
     this.addProduct();
  }

  ngOnInit() {
  }
  
  

}
