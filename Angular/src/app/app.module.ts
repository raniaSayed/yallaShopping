import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
<<<<<<< HEAD
import { AuthComponent } from './auth/auth.component';


import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    HttpClientModule,
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
      ];
  )
  return config;
}
=======
import { SubCategoryProductsComponent } from './body/sub-category-products/sub-category-products.component';
import { ProductDetailsComponent } from './body/product-details/product-details.component';
import { AddProductComponent } from './body/add-product/add-product.component';


const appRoutes: Routes = [
  { path: '', component: BodyComponent,
    children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'category/:subcategory', component: SubCategoryProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'product/add', component: AddProductComponent },
    ]
  },
  { path: '**', component: BodyComponent }
];
>>>>>>> cdd47264c2dffd1066ec58d10203657af7875c04


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BodyComponent,
<<<<<<< HEAD
    AuthComponent
  ],
  imports: [
    BrowserModule,
  SocialLoginModule,
HttpClientModule
=======
    SubCategoryProductsComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
>>>>>>> cdd47264c2dffd1066ec58d10203657af7875c04
  ],
  providers: [{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
