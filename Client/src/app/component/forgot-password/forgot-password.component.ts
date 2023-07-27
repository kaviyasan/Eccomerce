import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service:ProductServerService,private cartServer:CartService) { }

  forgotPass=new FormGroup({
    Email:new FormControl('',[Validators.required,Validators.pattern("[A-Za-z0-9]+@gmail.com")])
  })

  get Email(){
    return this.forgotPass.get("Email")
  }

  ngOnInit(): void {
  }

  submitEmail(){
    this.service.forgotPassword(this.forgotPass.value).subscribe((data:any)=>{
      console.log(data);
      this.cartServer.setToken(JSON.parse(JSON.stringify(data)).token)
      console.log(JSON.parse(JSON.stringify(data)).token);
    })
  }

}
