import { Component, OnInit } from '@angular/core';
import { PatternValidator, NgForm } from '@angular/forms';
import { SellerRegisterationServiceService } from '../services/seller-registeration-service.service';
import { Router  } from '@angular/router';

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

  constructor(private route: Router, private sellerRegisterationService: SellerRegisterationServiceService) { }

  register(){
    this.sellerRegisterationService.sendDataToServer({
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'address': this.address,
      'national_id': this.national_id
    }).subscribe((res)=>{
      console.log(res)
      if(res['status']=="ok"){
        console.log("user created");
        this.route.navigate(['users/login'])
      
      }else{
        console.log("error");
        console.log(res['errors']);
        if(res['errors']){
          if(res['errors'].email){
            this.serverErrors = res['errors'].email.message+" ";
          }
          if(res['errors'].password){
            this.serverErrors += res['errors'].password.message+" ";
          }
          if(res['errors'].name){
            this.serverErrors += res['errors'].name.message;
          }
        }else{
            this.serverErrors = res['errmsg'];
        }
        
      }
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
