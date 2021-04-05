import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { Product } from "../../models/Product";
import { Observable, of } from 'rxjs';
import {AppDataState, DataStateEnum  } from "../../state/product.state";
import { map, catchError,startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>;
  public readonly DataStateEnum = DataStateEnum
  constructor(private productsService: ProductsService,private router: Router) { }

  ngOnInit(): void {

  }
  onGetAllProducts(){
     this.products$ = this.productsService.getAllProducts()
    .pipe(map( data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts()
    .pipe(map( data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onGetAvailableroducts(){
    this.products$ = this.productsService.getAvailableProducts()
    .pipe(map( data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onSearch(dataForm :any){
    this.products$ = this.productsService.searchproducts(dataForm.keyword)
    .pipe(map( data=>({dataState: DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onSelect(p){
    this.productsService.select(p).subscribe(data=>{
      p.selected = data.selected
    })
  }
  onNewProduct(){
    this.router.navigateByUrl("addProduct");
  }
  onEdit(p){
    this.router.navigateByUrl("editProduct/"+p.id);
  }

  onDelete(p:Product){
    if(confirm("Etes vous ur de vouloir supprimer"))
    this.productsService.delete(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }


}
