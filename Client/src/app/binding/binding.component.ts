import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {
data:any
  constructor() { }

  ngOnInit(): void {
  }

  image="../../assets/image/admin.jpg"
  para:string="sdvkfmna,b"
type:string="password"
  h = 300;
	w = 200;
	bdr = 5;
	clspn = 5;
  firstname:string="Kaviya"
  lastname:string="Anjali"
  myClass="red"
  color="blue"

  clickMe(){
    this.data="Hi, Hello"
  }

}
