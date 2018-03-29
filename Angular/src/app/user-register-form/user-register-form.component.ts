import { Component, OnInit } from '@angular/core';
import { PatternValidator, NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { UserRegisterationService } from '../services/user-registeration.service';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent implements OnInit {
  private name: string;
  private email: string;
  private password: string;
  private confirmPassword: string;
  private picture: any;
  private address: string;
  private cart: object;
  private valid: boolean = true;
  private passCheck: boolean = true;
  private serverErrors: string;

  constructor(private userRegisterationService: UserRegisterationService, private route: Router, private AuthService: AuthServiceService) { 
    this.AuthService.checkToken().subscribe(res=>{
      if (res) {
        route.navigate([''])
      }
    })
  }

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
  register(){
    this.userRegisterationService.sendDataToServer({
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'address': this.address,
      'picture': this.picture,
      'origin': "N"
    }).subscribe((res)=> {
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
            this.serverErrors = "this email already exists";
        }
        
      }
      
    });
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
