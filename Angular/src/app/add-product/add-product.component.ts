import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddProductService } from '../add-product.service';

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
  private category: number;
  private subcategory: string;
  private serverErrors: string;

  constructor(private AddProductService : AddProductService) { }

  fileUpload(files){
  console.log(files[0]);
  this.picture = files[0];
  var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(this.picture);
    myReader.onloadend = (e) => {
    this.picture = myReader.result;
    console.log(this.picture)
  }
}


  addProduct(){
    this.seller_id=2;
    this.AddProductService.sendDataToServer({
      'name': this.name,
      'price': this.price,
      'description': this.description,
      'stock': this.stock,
      'picture': this.picture,
      'category':this.category,
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
