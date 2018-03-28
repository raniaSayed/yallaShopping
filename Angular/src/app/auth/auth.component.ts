import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { Router  } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthServiceService]
})
export class AuthComponent implements OnInit {
  user = {email:"", password:""}
  signInError = false
  formNotValid = false
  constructor(private route: Router, private socialAuthService: AuthService, private myAuthService: AuthServiceService) { }

  ngOnInit() {
  }


    public socialSignIn(socialPlatform : string) {
      let socialPlatformProvider;
      if(socialPlatform == "facebook"){
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }else if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          this.myAuthService.getUserToken(userData).subscribe((res)=>{console.log(res)})
          // console.log(socialPlatform+" sign in data : " , userData);

        }
      );
    }


   onSubmit({value, valid}){

    if(valid){
      this.myAuthService.signIn(value).subscribe(res=>{
      if (res['success']) {
        localStorage.setItem("x-access-token", res['token'])
        this.route.navigate([''])
      }else{
        this.signInError = true
        this.formNotValid = false
      }
    })
    } else {
        this.signInError = false
        this.formNotValid = true
    }
   }
}
