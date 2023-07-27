import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList:any=[]
  productList=new BehaviorSubject<any>([]);
  search=new BehaviorSubject<string>("")

  constructor() { }

  getProducts(){
    return this.productList.asObservable()
  }

  // setProduct(product:any){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product)
  // }

  AddtoCart(product:any){
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList);
    // console.log(this.cartItemList);
    
  }

  setToken(token:any){
    console.log(token);
    
      localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  headers(){
    let token=this.getToken()
    let header=new HttpHeaders().set(
      "Authorization",`Bearer ${token}`
      // this.token
    )

    return header
   }
}
