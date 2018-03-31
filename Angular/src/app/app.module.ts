import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { HttpModule } from '@angular/http';
import { RatingModule } from "ngx-rating";
import { NgxPaginationModule } from 'ngx-pagination';

//george ...
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UICarouselModule } from "ui-carousel"
import { Http } from '@angular/http';
import { NgxSlideshowModule } from 'ngx-slideshow';
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';



import { AuthComponent } from './auth/auth.component';
import { AddProductComponent } from './add-product/add-product.component';

//george...
import { UserRegisterationService } from './services/user-registeration.service';
import { SellerRegisterationServiceService } from './services/seller-registeration-service.service';
import { GetSellerProductsService } from './services/get-seller-products.service';


import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular5-social-login";

import { AuthServiceService } from './services/auth-service.service';
import { AddProductService } from './services/add-product.service';
import { EditProductService } from './services/edit-product.service';
import { ForgetPasswordService } from './services/forget-password.service';


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
import { LimitToPipe } from './limit-to.pipe';

import { CategoryService } from './services/category.service';
import { RateService } from './services/rate.service'
import { SubCategoryProductsComponent } from './sub-category-products/sub-category-products.component';
import { SubCategoryProductService } from './services/sub-category-product.service';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from './services/cart.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HomeComponent } from './home/home.component';
import { UserRegisterFormComponent } from './user-register-form/user-register-form.component';
import { SellerRegisterationFormComponent } from './seller-registeration-form/seller-registeration-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';



import { SellerProductsComponent } from './seller-products/seller-products.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { OrdersSellerComponent } from './orders-seller/orders-seller.component';
import { OrdersSellerService } from './services/orders-seller.service';
import { SellerOrdersDetailsComponent } from './seller-orders-details/seller-orders-details.component';

import { SearchProductComponent } from './search-product/search-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TopProductsService } from './services/top-products.service';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/registeration', component: UserRegisterFormComponent },
  { path: 'sellers/registeration', component: SellerRegisterationFormComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/search', component: SearchProductComponent },

  { path: 'products/edit/:id', component: EditProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'products/seller', component: SellerProductsComponent },
  { path: 'users/cart', component: UserCartComponent },
  { path: 'users/login', component: AuthComponent },
  { path: 'sellers/orders', component: OrdersSellerComponent },
  { path: 'sellers/orders/:order_id', component: SellerOrdersDetailsComponent },
  { path: 'categories/:category/:subcategory', component: SubCategoryProductsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
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
    HomeComponent,
    SearchProductComponent,
    OrdersSellerComponent,
    SellerOrdersDetailsComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    UICarouselModule,
    NgxSlideshowModule.forRoot(),
    NgbModule.forRoot(),
    RatingModule,
    NgxPaginationModule,
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
    OrdersSellerService,
    RateService,
    ForgetPasswordService,
    NgbCarousel,
    TopProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
