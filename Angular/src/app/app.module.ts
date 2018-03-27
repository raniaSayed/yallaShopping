import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

//george ...
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {Http} from '@angular/http';

import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
//import { HeaderComponent } from './header/header.component';
//import { SidebarComponent } from './header/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';

// import { HeaderModule } from './header/index';


import { AuthComponent } from './auth/auth.component';
import { AddProductComponent } from './add-product/add-product.component';

import { HeaderModule} from './header/index';
//george...
import { UserRegisterationService } from './user-registeration.service';
import { SellerRegisterationServiceService } from './seller-registeration-service.service';
import { GetSellerProductsService } from './get-seller-products.service';


import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular5-social-login";

import { AuthServiceService } from './auth-service.service';
import { AddProductService } from './add-product.service';
import { EditProductService } from './edit-product.service';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("566145113759448")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("521472444901-f0ijnmhagvoa5e5st8hm4q1orksj4v9j.apps.googleusercontent.com")
        },
      ])
  return config;
}
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LimitToPipe } from  './limit-to.pipe';

import { CategoryService } from './services/category.service';

import { SubCategoryProductsComponent } from './sub-category-products/sub-category-products.component';
import { SubCategoryProductService } from './services/sub-category-product.service';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from './services/cart.service';
import { SafeHtmlPipe } from './safe-html.pipe';

import { UserRegisterFormComponent } from './user-register-form/user-register-form.component';
import { SellerRegisterationFormComponent } from './seller-registeration-form/seller-registeration-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { UserCartComponent } from './user-cart/user-cart.component';
const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'users/registeration', component: UserRegisterFormComponent },
  { path: 'sellers/registeration', component: SellerRegisterationFormComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/seller/:id', component: SellerProductsComponent },
  { path: 'users/cart', component: UserCartComponent },
  { path: 'categories/:category/:subcategory', component: SubCategoryProductsComponent },
  // { path: '**', component: BodyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
     //HeaderComponent,
    // HeaderModule,
   // SidebarComponent,

    FooterComponent,
    BodyComponent,
    LimitToPipe,
    UserRegisterFormComponent,
    SellerRegisterationFormComponent,
    AuthComponent,
    ProductDetailsComponent,
    AddProductComponent,
    EditProductComponent,
    LimitToPipe,
    SubCategoryProductsComponent,
    SafeHtmlPipe,
    SellerProductsComponent,
    UserCartComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ],

  providers: [
    UserRegisterationService,
    SellerRegisterationServiceService,
    CategoryService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthServiceService,
    AddProductService,
    EditProductService,
    SubCategoryProductService,
    ProductDetailsService,
    CartService,
    GetSellerProductsService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
