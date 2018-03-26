import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { AuthComponent } from './auth/auth.component';


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
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderModule } from './header/index';
import { LimitToPipe } from  './limit-to.pipe';

import { CategoryService } from './services/category.service';
import { SubCategoryProductsComponent } from './sub-category-products/sub-category-products.component';
import { SubCategoryProductService } from './services/sub-category-product.service';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from './services/cart.service';
import { SafeHtmlPipe } from './safe-html.pipe';

const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'categories/:category/:subcategory', component: SubCategoryProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', component: BodyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
    AuthComponent,
    ProductDetailsComponent,
    LimitToPipe,
    SubCategoryProductsComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes)
    ],
  providers: [
    CategoryService, 
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthServiceService,
    SubCategoryProductService,
    ProductDetailsService,
    CartService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
