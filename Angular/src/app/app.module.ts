import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//george ...
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from "angular2-image-upload";


import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';

import { HeaderModule } from './header/index';

import { LimitToPipe } from  './limit-to.pipe';
//george...
import { UserRegisterationService } from './user-registeration.service';
import { SellerRegisterationServiceService } from './seller-registeration-service.service';




import { CategoryService } from './services/category.service';
import { UserRegisterFormComponent } from './user-register-form/user-register-form.component';
import { SellerRegisterationFormComponent } from './seller-registeration-form/seller-registeration-form.component';
const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'users/registeration', component: UserRegisterFormComponent },
  { path: 'sellers/registeration', component: SellerRegisterationFormComponent },
  { path: '**', component: BodyComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    BodyComponent,
    LimitToPipe,
    UserRegisterFormComponent,
    SellerRegisterationFormComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ImageUploadModule.forRoot(),
  ],
  providers: [CategoryService,
     UserRegisterationService,
     SellerRegisterationServiceService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
