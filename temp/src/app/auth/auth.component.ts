import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    GoogleLoginProvider
} from 'angular5-social-login';

import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthServiceService]
})
export class AuthComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private authService : AuthServiceService) { }

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
        this.authService.getUserToken(userData).subscribe((res) => {
          console.log(res);

        })
         // console.log(res);
      //   this.authService.getUserToken(userData).subscribe((res)=>{
      // console.log(res)});
        // return userData;
        // console.log(socialPlatform+" sign in data : " , userData);
      }
    );

  //   this.authService.getUserToken(socialPlatformProvider).then(
  //     (userData) => {
  //       // return userData;
  //       console.log(socialPlatform+" sign in data : " , userData);
  //     }
  //   );
  // }

}
}
