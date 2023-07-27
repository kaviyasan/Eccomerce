import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  login:any;

   Admin=new FormGroup({
    Email:new FormControl("",[Validators.required,Validators.pattern("[A-Za-z0-9]+@gmail.com")]),
    Password:new FormControl("",[Validators.required])
   })

   get Email(){
    return this.Admin.get("Email")
   }
   get Password(){
    return this.Admin.get("Password")
   }
  constructor( 
    private server:ProductServerService,
    private roter:Router
    ) { }

  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  hideShow(){
    this.isText=!this.isText
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" : this.type="password"
  }

  ngOnInit(): void {
  }


  submitAdmin(){
    if(this.Admin.valid){
      this.server.forAdmin(this.Admin.value).subscribe((result)=>{
        this.login=result
        if(this.login.code==200){
          alert("Success")
          console.log(this.login);
          this.Admin.reset()
          this.roter.navigate(["fileupload"])
        }
        else if(this.login.code==400 && this.login.Message=="Email is not correct"){
          alert("Incorrect Email")
        }
        else if(this.login.code==400 && this.login.Message=="Password is not corect"){
          alert("Incorrect Password")
        }
      })
    }
    else{
      alert("Something went wrong")
    }
  }
  

}
