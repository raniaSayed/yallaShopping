import { Component, OnInit,AfterViewChecked, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { DoCheck,OnDestroy, ContentChild,AfterContentChecked, ViewChild,  SimpleChanges } from '@angular/core';


var clinetId =" 170131272342-r63f34q7lqp7gcmcnmglfo3fup0demht.apps.googleusercontent.com "
var clientSecret =" W9xeKuiCB-Glg9oI_XoNAkj0 "

declare const gapi: any;
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '170131272342-r63f34q7lqp7gcmcnmglfo3fup0demht.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

ngAfterViewInit(){
      this.googleInit();
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
