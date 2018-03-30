import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ForgetPasswordService {

  constructor(private http:Http) { 
  }

  sendEmail(email) {
    return this.http.post('https://localhost:9090/auth/forget', {
      email,
    });
  }

}
