import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  HomeComponent} from "../app/components/home/home.component";
import {  ProductsComponent} from "../app/components/products/products.component";
import {  AddProductComponent} from "../app/products/add-product/add-product.component";
import {  EditProductComponent} from "../app/components/edit-product/edit-product.component";
const routes: Routes = [
  {path: "",component:HomeComponent},
  {path: "products",component:ProductsComponent},
  {path: "addProduct",component:AddProductComponent},
  {path: "editProduct/:id",component:EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
