import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServerService } from 'src/app/services/product-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    phone_Num: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
    Email: new FormControl('',[Validators.required,Validators.pattern("[A-Za-z0-9]+@gmail.com")]),
    Password: new FormControl('',[Validators.required,Validators.maxLength(15)]),
    Confirm_Password: new FormControl('',[Validators.required,Validators.maxLength(15)])
  })

  get username(){
    return this.signUp.get("username")
  }
  get phone_Num(){
    return this.signUp.get("phone_Num")
  }
  get Email(){
    return this.signUp.get("Email")
  }
  get Password(){
    return this.signUp.get("Password")
  }
  get Confirm_Password(){
    return this.signUp.get("Confirm_Password")
  }

  type: string = "password"
  Type:string='password'
  isText: boolean = false
  eyeIcon: string = "fa-eye-slash"
  iIcon:string='fa-eye-slash'
  saveUserdata: any
  constructor(private server: ProductServerService, private router:Router) { }

  ngOnInit(): void {
    
  }

  hideShow() {
    this.isText = !this.isText
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password"
  }
  hideNDShow(){
    this.isText = !this.isText
    this.isText ? this.iIcon = "fa-eye" : this.iIcon = "fa-eye-slash"
    this.isText ? this.Type = "text" : this.Type = "password"
  }

  submitSignUP() {
    if (this.signUp.valid && this.signUp.controls.Password.value == this.signUp.controls.Confirm_Password.value) {
      this.server.UserSingUP(this.signUp.value).subscribe((data) => {
        this.saveUserdata = data
      })
      console.log(this.saveUserdata);
      alert("Successfully signup")
      this.signUp.reset()
      this.router.navigate([""])
      
      
    }
    else if (this.signUp.controls.Password.value != this.signUp.controls.Confirm_Password.value) {
      alert("Password is not match")
      console.log(this.saveUserdata);
      
    }
    else {
      alert("Something Went Wrong")
      console.log(this.saveUserdata);
      
    }

  }
}
