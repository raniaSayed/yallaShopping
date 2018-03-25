import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';

import { AuthComponent } from './auth/auth.component';


import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
} from "angular5-social-login";


import { AuthServiceService } from './auth-service.service';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider("Your-Facebook-app-id")
        // },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("521472444901-f0ijnmhagvoa5e5st8hm4q1orksj4v9j.apps.googleusercontent.com")
        },
      ]);
  return config;
}
import { SubCategoryProductsComponent } from './body/sub-category-products/sub-category-products.component';
import { ProductDetailsComponent } from './body/product-details/product-details.component';
// import { AddProductComponent } from './body/add-product/add-product.component';


import { HeaderModule } from './header/index';

import { LimitToPipe } from  './limit-to.pipe';


import { CategoryService } from './services/category.service';
const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: '**', component: BodyComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    BodyComponent,

    AuthComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    SubCategoryProductsComponent,
    ProductDetailsComponent,
    // AddProductComponent,
    LimitToPipe,
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthServiceService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
