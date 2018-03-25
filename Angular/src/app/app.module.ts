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

import { AuthComponent } from './auth/auth.component';

//george...
import { UserRegisterationService } from './user-registeration.service';
import { SellerRegisterationServiceService } from './seller-registeration-service.service';



import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular5-social-login";

import { AuthServiceService } from './auth-service.service';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("521472444901-f0ijnmhagvoa5e5st8hm4q1orksj4v9j.apps.googleusercontent.com")
        },
      ])
  return config;
}
import { SubCategoryProductsComponent } from './sub-category-products/sub-category-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderModule } from './header/index';
import { LimitToPipe } from  './limit-to.pipe';

import { CategoryService } from './services/category.service';
import { UserRegisterFormComponent } from './user-register-form/user-register-form.component';
import { SellerRegisterationFormComponent } from './seller-registeration-form/seller-registeration-form.component';
const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'users/registeration', component: UserRegisterFormComponent },
  { path: 'sellers/registeration', component: SellerRegisterationFormComponent },
  { path: '**', component: BodyComponent },
  { path: 'category/:subcategory', component: SubCategoryProductsComponent },
  { path: '**', component: BodyComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    BodyComponent,
    LimitToPipe,
    UserRegisterFormComponent,
    SellerRegisterationFormComponent,
    AuthComponent,
    SubCategoryProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    //SubCategoryProductsComponent,
    //ProductDetailsComponent,
    // AddProductComponent,
    //LimitToPipe,
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ImageUploadModule.forRoot(),
  ],

  providers: [
    UserRegisterationService,
    SellerRegisterationServiceService,
    CategoryService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
