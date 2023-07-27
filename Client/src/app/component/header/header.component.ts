import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  addtocart:number=0;
  searchItem:string=''

  constructor(
    private cartserver:CartService,
    private router:Router,
    
    ) { }

  ngOnInit(): void {
    // this.cartserver.getProducts().subscribe(res=>{
    //   this.addtocart=res.length
    // })
  }

  loginPage(){
    this.router.navigate([""])
  }
  search(event:any){
     this.searchItem=(event.target as HTMLInputElement).value;
     console.log(this.searchItem);
     this.cartserver.search.next(this.searchItem)
     
  }
  gotoCart(){
    this.router.navigate(["orderDetails"])
  }

  admin(){
    this.router.navigate(["admin"])
  }

}
