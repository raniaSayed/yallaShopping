import { Injectable } from '@angular/core';
// to be copied in the new code ....
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class UserRegisterationService {

  constructor(private http: HttpClient) { }

  sendDataToServer(userData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post('http://localhost:9090/users/', JSON.stringify(userData), httpOptions);
  }

}
