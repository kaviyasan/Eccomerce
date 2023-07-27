import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  updatePassword = new FormGroup({
    Password: new FormControl('',[Validators.required,Validators.maxLength(15)]),
    Confirm_Password: new FormControl('',[Validators.required,Validators.maxLength(15)])
  })

  get Password(){
    return this.updatePassword.get("Password")
  }
  get Confirm_Password(){
    return this.updatePassword.get("Confirm_Password")
  }

  type: string = "password"
  Type:string='password'
  isText: boolean = false
  eyeIcon: string = "fa-eye-slash"
  iIcon:string='fa-eye-slash'
  constructor(private server: ProductServerService, private router:Router, private cartServer:CartService) { }

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

  changeNewPassword(){
    if (this.updatePassword.controls.Password.value==this.updatePassword.controls.Confirm_Password.value&&this.updatePassword.controls.Password.value!=undefined) {
      this.server.resetPassword(this.updatePassword.value).subscribe((data)=>{
        console.log(data);
      alert("reset your password")
      this.router.navigateByUrl("")
        
      })
    }
  }
}
