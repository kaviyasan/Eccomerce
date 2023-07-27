import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServerService } from 'src/app/services/product-server.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file: any;
  csvFile: any;

  constructor(private server:ProductServerService, private router:Router) { }

  ngOnInit(): void {
  }

  onChange(event:any){
    this.file=event.target.files[0]
  }

  fileUpload(){
    var formData=new FormData();

    formData.append("productFile",this.file)
    this.server.fileUpload(formData).subscribe((res)=>{
      this.csvFile=res
      console.log(this.csvFile);
      if(this.csvFile.code==400 && this.csvFile.Message=="Please upload a CSV file!"){
        alert("Please upload a CSV file!")
        console.log(this.csvFile)
        window.location.reload()
      }
      else if(this.csvFile.code==200 && this.csvFile.message== "Product Upload Successfully !!!"){
        alert( "Product Upload Successfully !!!")
        console.log(this.csvFile);
        this.router.navigate(["product"])
        .then(()=>{
          window.location.reload()
        })
        
      }
    })
  }

}
function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}

