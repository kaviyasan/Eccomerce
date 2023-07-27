import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
// import { Token } from '@angular/compiler';

export class User{
  [x: string]: number;
  Result: any;
  data: any;

}

@Injectable({
  providedIn: 'root'
})
export class ProductServerService {

  endPoint='http://localhost:5000/api'

 

  constructor(private httpClient:HttpClient, private inject:Injector, private cartServer:CartService) {

   }
   

  getProduct():Observable<User>{
    let token=this.cartServer.getToken()
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)
    console.log(headers);
    
    return this.httpClient.get<User>(this.endPoint+"/fetchProduct",{headers})
  }

  UserSingUP(data:any):Observable<User>{
    return this.httpClient.post<User>(this.endPoint+"/register",data)
  }

  userLogin(data:any):Observable<User>{
    return this.httpClient.post<User>(this.endPoint+"/login",data)
  }

  orderSave(data:any){
    let token=this.cartServer.getToken()
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)

    return this.httpClient.post(this.endPoint+"/productOrder",data,{headers})
  }

  getOrderDetail():Observable<User>{
    let token=this.cartServer.getToken()
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)

    return this.httpClient.get<User>(this.endPoint+"/getproduct",{headers})
  }

  deleteOrderItem(data:any):Observable<User>{
    let token=this.cartServer.getToken()
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)

    return this.httpClient.post<User>(this.endPoint+"/deleteorder",data,{headers})
  }

  updateOrderItem(data:any):Observable<User>{
    let token=this.cartServer.getToken()
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)

    return this.httpClient.put<User>(this.endPoint+"/updateorder",data,{headers})
  }

  forAdmin(data:any){
    return this.httpClient.post<User>(this.endPoint+"/loginForADMIN",data)
  }

  fileUpload(data:any){
    return this.httpClient.post<User>(this.endPoint+"/upload",data)
  }

  forgotPassword(email:any){
    return this.httpClient.post(this.endPoint+"/forgotPassword",email)
  }

  resetPassword(newPassword:any){
    let token=this.cartServer.getToken()
    console.log(token);
    
    let headers=new HttpHeaders().set("Authorization",`Bearer ${token}`)
    console.log(headers);
    return this.httpClient.post(this.endPoint+"/resetPassword",newPassword,{headers})
  }
}
