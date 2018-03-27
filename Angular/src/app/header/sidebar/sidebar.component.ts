import { Component, OnInit,Input } from '@angular/core';
import {  CategoryService  } from '../../services/category.service';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
//  template:` <ul >
//  <li *ngFor="let t of nums">
//   <span >{{t}}</span>
//  </li>
// </ul>`,
  styleUrls: ['../header.component.css']
})


export class SidebarComponent implements OnInit {
  categories;
 // @Input() isActive:boolean;
  //  categories:any[];

  

  ngOnInit() {
  }

}
