import { Pipe } from '@angular/core';
@Pipe({
    name: "indexOf"
})
export class IndexOf{
    transform(value:any, list:any){
        return list.indexOf(value) >-1;
    }
}