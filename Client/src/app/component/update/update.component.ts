import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

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
  update:any;

  constructor(private router:Router,
    private cartserver:CartService,
    private server:ProductServerService) { }

  ngOnInit(): void {
    this.getproduct()


    if(this.product){
      for(let i of this.product){
        this.onlineOrder.controls['OrderId'].patchValue(i.OrderId)
        this.onlineOrder.controls['Date'].patchValue(i.Date)
        this.onlineOrder.controls["productname"].patchValue(i.productname)
        this.onlineOrder.controls['price'].patchValue(i.price)
        this.onlineOrder.controls['Quantity'].patchValue(i.Quantity)
        this.onlineOrder.controls['Total'].patchValue(i.Total)
        this.onlineOrder.controls['Image'].patchValue(i.Image)
      }
    }
  }

  getproduct(){
    this.cartserver.getProducts().subscribe((res)=>{
      this.product=res
    })
  }

  inc(no:any,a:any){
    // if(no.quantity>=a.quantity){
    //   alert("out of stack")
    // }
    // else{
    // no.quantity=no.quantity+1;
    // }
  }
  dec(no:any){
    // if(no.quantity<=1){
    //   alert("cannot be decreament")
    // }
    // else{
    // no.quantity=no.quantity-1;
    // }
  }

  answer=[{
   quantity:1
}]

  addtoCart(){
    if(this.product){
      this.server.updateOrderItem(this.onlineOrder.value).subscribe((res)=>{
        this.update=res
        console.log(this.update);
        
        alert("Update your cart")
        this.router.navigate(["orderDetails"])
        .then(()=>{
          window.location.reload()
        })
      })
    }
    else{
      alert("something went wrong ")
    }
  }

  backProduct(){

  }

}
