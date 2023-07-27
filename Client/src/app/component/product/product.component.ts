import { Component, OnInit } from '@angular/core';
import { ProductServerService } from 'src/app/services/product-server.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  producItem:any;
  filterCategory:any
  searchkey:string=""

  constructor(private server:ProductServerService,
     private router:Router, 
     private dialog:MatDialog, 
     private cartServer:CartService) { }

  ngOnInit(): void {
    this.getViewProduct()

    this.cartServer.search.subscribe((text)=>{
      this.searchkey=text
    })
  }

  getViewProduct(){
    this.server.getProduct().subscribe((data)=>{
      this.producItem=data.Result;
      this.filterCategory=data.Result
      console.log(this.producItem);
      
    })
  }

  openCart(item:any){
    this.cartServer.AddtoCart(item)
      console.log(item);
      
      this.router.navigate(["cart"])
  }

  filter(category:string){
    this.filterCategory=this.producItem
    .filter((a:any)=>{
      if(a.category == category || category == ""){
        return a
      }
    })
  }



  

}
