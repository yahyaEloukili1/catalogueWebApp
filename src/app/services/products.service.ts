import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Product } from "../models/Product";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  //injecter le service http
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    let host = (Math.random()>0.2) ? environment.host : environment.unreachableHost;
    //j'attends une liste de produits
    return this.http.get<Product[]>(`${host}/products`);
  }
  getSelectedProducts(): Observable<Product[]>{
    let host = environment.host;
    //j'attends une liste de produits
    return this.http.get<Product[]>(`${host}/products?selected=true`);
  }
  getAvailableProducts(): Observable<Product[]>{
    let host = environment.host;
    //j'attends une liste de produits
    return this.http.get<Product[]>(`${host}/products?available=true`);
  }
  searchproducts(keyword:string): Observable<Product[]>{
    let host = environment.host;
    //j'attends une liste de produits
    return this.http.get<Product[]>(`${host}/products?name_like=${keyword}`);
  }
  select(product:Product):Observable<Product>{
    let host = environment.host;
    //j'attends une liste de produits
    product.selected = !product.selected
    return this.http.put<Product>(`${host}/products/${product.id}`,product);
  }
  save(product:Product):Observable<Product>{
    let host = environment.host;
    //j'attends une liste de produits
    product.selected = !product.selected
    return this.http.post<Product>(`${host}/products`,product);
  }
  getProduct(id :number):Observable<Product>{
    let host = environment.host;

    return this.http.get<Product>(`${host}/products/${id}`);
  }
  updateProduct(p: Product):Observable<Product>{
    let host = environment.host;

    return this.http.put<Product>(`${host}/products/${p.id}`,p);
  }
  delete(product:Product):Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(`${host}/products/${product.id}`);
  }
}
