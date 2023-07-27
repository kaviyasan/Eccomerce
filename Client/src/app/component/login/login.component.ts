import { FacebookLoginProvider, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    Email:new FormControl('',[Validators.required,Validators.pattern("[A-Za-z0-9]+@gmail.com")]),
    Password:new FormControl('',[Validators.required,Validators.maxLength(15)])
  })
  user:any
  loggedIn: any

  get username(){
    return this.login.get("username")
  }
  get Email(){
    return this.login.get("Email")
  }
  get Password(){
    return this.login.get("Password")
  }

  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  saveData:any;
  constructor(private server:ProductServerService, private router:Router, private cartServer:CartService,
    private authService:SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
    
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(response => {
  //       // Handle successful login
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error(error);
  //     });
  // }

  hideShow(){
    this.isText=!this.isText
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" : this.type="password"
  }

  submitLogin(){
     if(this.login.valid){
      this.server.userLogin(this.login.value).subscribe((data)=>{
        this.saveData=data
        if(this.saveData.code==200){
          alert("Successfully login")
          this.login.reset()
          this.cartServer.setToken(data['TOKEN']);
          console.log(this.cartServer.setToken(data['TOKEN']));
          
          this.router.navigate(["product"])

        }
        else if(this.saveData.code==400 && this.saveData.Message=="Username is incorrect"){
          alert("Username is not match")
          console.log(this.saveData);
          
        }
        else if(this.saveData.code==400 && this.saveData.Message=="Email is incorrect"){
          alert("Email is not match")
          console.log(this.saveData);
          
        }
        else if(this.saveData.code==400 && this.saveData.Message=="Password is incorrect"){
          alert("Password is not match")
          console.log(this.saveData);
          
        }
      })
     }
  }
  
  forgotPassword(){
    this.router.navigateByUrl("forgotPassword")
  }
}
