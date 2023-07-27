import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[], filterString:string, search:string): any[] {
    const result:any=[]
    if(!value || filterString==='' || search===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[search].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a)
      }
    });
    return result
  }

}
