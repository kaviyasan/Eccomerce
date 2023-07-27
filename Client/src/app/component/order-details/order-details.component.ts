import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Image','Date','productname','price','Quantity','Total','Edit','Delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private server:ProductServerService,
    private cartserver:CartService,
    private router:Router) { }
 
  delete:any

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(){
    return this.server.getOrderDetail().subscribe((result)=>{
      this.dataSource=new MatTableDataSource(result.data)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort 
      console.log(result);
      
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row:any){
    this.cartserver.AddtoCart(row)
    this.router.navigate(["update"])

      
    
    
    console.log(row);
    
  }

  deleteproduct(row:any){
    return this.server.deleteOrderItem(row).subscribe({next:(res)=>{
      this.delete=res
      console.log(this.delete);
      alert("Delete your order")
      this.getDetails()
    } ,
    error:()=>{
      alert("Error While deleting the product")
    }
  })
  }

}
