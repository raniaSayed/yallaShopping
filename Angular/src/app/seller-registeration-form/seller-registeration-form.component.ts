import { Component, OnInit } from '@angular/core';
import { PatternValidator, NgForm } from '@angular/forms';
import { SellerRegisterationServiceService } from '../seller-registeration-service.service';
@Component({
  selector: 'app-seller-registeration-form',
  templateUrl: './seller-registeration-form.component.html',
  styleUrls: ['./seller-registeration-form.component.css']
})
export class SellerRegisterationFormComponent implements OnInit {
  private name: string;
  private email: string;
  private password: string;
  private confirmPassword: string;
  private address: string;
  private national_id: string;
  private valid: boolean = true;
  private passCheck: boolean = true;
  private serverErrors: string;

  constructor(private sellerRegisterationService: SellerRegisterationServiceService) { }

  register(){
    this.sellerRegisterationService.sendDataToServer({
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'address': this.address,
      'national_id': this.national_id
    }).subscribe((res)=>{

    })
  }
  submitIt(){
    console.log("submitFn");
    if(this.password!=this.confirmPassword || this.password==""){
      //
    }
    else{
      this.register();
    }
  }


  ngOnInit() {
  }

}
