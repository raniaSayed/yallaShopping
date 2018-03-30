import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditProductService } from '../edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
private product_id;
private productData;
private name: string;
private price: number;
private description: string;
private stock: number;
private picture: any;
private category: number;
private subcategory: string;
private serverErrors: string;

  constructor( private editProductService : EditProductService) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){

    this.product_id=2;
    this.editProductService.sendDataToServer(this.product_id).subscribe((res)=> {
      this.productData=res[0];
       // console.log(res);
       console.log(this.productData);

});

  }

  editProduct(){
    this.product_id=1;
    this.editProductService.sendDataToServerTwo(this.product_id,{
      'name': this.productData.name,
      'price': this.productData.price,
      'description': this.productData.description,
      'stock': this.productData.stock,
      'picture': this.productData.picture,
      'category':this.productData.category,
      'subcategory': this.productData.subcategory,
    }).subscribe((res)=> {
      // this.productData=res;
      console.log("hi")
      // console.log(this.productData)

      // console.log(this.productData);

});

  }


  submitIt(){
    console.log("submitFn");


      this.editProduct();

  }

}
