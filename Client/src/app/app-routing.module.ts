import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { ProductComponent } from './component/product/product.component';
import { SignupComponent } from './component/signup/signup.component';
import { UpdateComponent } from './component/update/update.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { BindingComponent } from './binding/binding.component';

const routes: Routes = [
  {path:"head",component:HeaderComponent},
  {path:"product",component:ProductComponent},
  {path:"cart",component:CartComponent},
  {path:"signup",component:SignupComponent},
  {path:"",component:LoginComponent},
  {path:"orderDetails",component:OrderDetailsComponent},
  {path:"update",component:UpdateComponent},
  {path:"admin",component:AdminComponent},
  {path:"fileupload",component:FileUploadComponent},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"binding",component:BindingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
