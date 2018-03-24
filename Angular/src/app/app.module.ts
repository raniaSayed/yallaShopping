import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BodyComponent,
    SubCategoryProductsComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
