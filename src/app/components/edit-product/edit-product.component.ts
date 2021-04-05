import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId? : number
  submitted : boolean = false
  productFormGroup : FormGroup
  constructor(private fb: FormBuilder,private activatedRoute:ActivatedRoute,private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productsService.getProduct(this.productId).subscribe(data=>{
      this.productFormGroup = this.fb.group({
        id:  [this.productId,Validators.required],
        name : ['',Validators.required],
        price : [0,Validators.required],
        quantity : [0,Validators.required],
        selected : [true,Validators.required],
        available : [true,Validators.required],
      })
    })
  }
  onUpdate(){
      this.productsService.updateProduct(this.productFormGroup.value).subscribe(data=>{
        alert("success")
      })
  }
}
