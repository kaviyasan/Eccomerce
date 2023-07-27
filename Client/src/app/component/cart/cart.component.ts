import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { findIndex } from 'rxjs';
import { ProductServerService } from 'src/app/services/product-server.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  onlineOrder=new FormGroup({
    OrderId: new FormControl('',[Validators.required]),
    Date: new FormControl('',[Validators.required]),
    // Customer: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    Quantity: new FormControl('', [Validators.required]), 
    Total:new FormControl('',[Validators.required]),
    Image:new FormControl('')
  })
  product: any;
  saveOrder:any
  
  // quantity!: number;
  // name :string='kaviya'
  constructor(private cartserver:CartService, 
    private server:ProductServerService,
    private dr:ChangeDetectorRef,
    private router:Router) { }

  ngOnInit(): void {
    this.getprops()
    

    // let a=[]
    // if(this.product.OrderId){
    //   this.onlineOrder.controls['OrderId'].setValue(this.product.OrderId
    // }
    
    
    if(!this.product.OrderId){
      for(let i of this.product){

      this.onlineOrder.controls['productname'].patchValue(i.productname)
      this.onlineOrder.controls['price'].patchValue(i.price)
      this.onlineOrder.controls['Image'].patchValue(i.Image)
      // this.product.reset()
      console.log(i.price);
      console.log(i.Image);
      
      
    }
  }
    // console.log(this.product.productList);
    
    
    
  }
 

  getprops(){
    this.cartserver.getProducts().subscribe(res=>{
      this.product=res
      console.log(this.product.price);
      
      // console.log((this.product));
    })
  }
 
  addtoCart(){
    if(!this.product.OrderId){
      // if(this.onlineOrder.valid){
     this.server.orderSave(this.onlineOrder.value).subscribe((data)=>{
      this.saveOrder=data
      console.log(this.saveOrder);
 
      alert("saved")
      this.router.navigate(['orderDetails'])
      // .then(() => {
      //   window.location.reload();
      // });      
    }) 
}
   
  else{
    alert("somting went wrong")
  }
  // }
  }
  
  backProduct(){
    this.router.navigate(['product'])
  .then(() => {
    window.location.reload();
  });
  }

  inc(no:any,a:any){
    if(no.quantity>=a.quantity){
      alert("out of stack")
    }
    else{
    no.quantity=no.quantity+1;
    }
  }
  dec(no:any){
    if(no.quantity<=1){
      alert("cannot be decreament")
    }
    else{
    no.quantity=no.quantity-1;
    }
  }

  answer=[{
    quantity:1
}]

ngOnChanges(changes: SimpleChanges) {
  console.log(changes)
}
    
  }


