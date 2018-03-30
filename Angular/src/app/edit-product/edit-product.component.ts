import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditProductService } from '../services/edit-product.service';
import { ActivatedRoute } from '@angular/router';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
private product_id: number;
private productData: any;
private name: string;
private price: number;
private desc: string;
private stock: number;
private picture: any;
private category: number;
private subcategory: string;
private serverErrors: string;

  constructor(private router:Router, private route: ActivatedRoute, private editProductService : EditProductService) {
    this.route.params.subscribe(params => {
      this.product_id = params["id"];
    });
    this.getProduct(this.product_id);
   }

  ngOnInit() {
  }

  getProduct(id){
    this.editProductService.sendDataToServer(id).subscribe((res)=> {
      this.productData=res;
       // console.log(res);
       console.log(this.productData);

});

  }

  editProduct(){
    this.editProductService.sendDataToServerTwo(this.product_id,{
      'name': this.productData.name,
      'price': this.productData.price,
      'desc': this.productData.desc,
      'stock': this.productData.stock,
      'picture': this.productData.picture,
      'category':this.productData.category,
      'subcategory': this.productData.subcategory,
    }).subscribe((res)=> {
      // this.productData=res;
      console.log("hi")
      // console.log(this.productData)
      if(res['status']=="ok"){
        this.router.navigate([`/categories/${this.productData.category}/${this.productData.subcategory}`])
      }

      // console.log(this.productData);

});

  }


  submitIt(){
    console.log("submitFn");


      this.editProduct();

  }

}
