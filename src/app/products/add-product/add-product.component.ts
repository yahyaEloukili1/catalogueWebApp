import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
productformGroup : FormGroup
submitted : boolean = false
fields
  constructor(private fb: FormBuilder,private productService:ProductsService) { }

  ngOnInit(): void {
    this.productformGroup = this.fb.group({
      name : ['',Validators.required],
      price : [0,Validators.required],
      quantity : [0,Validators.required],
      selected : [true,Validators.required],
      available : [true,Validators.required],
    })
  }
  onSave(){
    this.submitted = true
    if(this.productformGroup.invalid) return;
  this.productService.save(this.productformGroup.value).subscribe(data=>{
      alert("Success saving product")
  })
  }
}
