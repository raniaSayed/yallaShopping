import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from '../services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email: string = '';

  constructor(private forgetPasswordService: ForgetPasswordService, private route:Router) { }

  ngOnInit() {
  }

  submitIt(){
    this.forgetPasswordService.sendEmail(this.email).subscribe();
    this.route.navigate(['/users/login']);
  }

}
