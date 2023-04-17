import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], args?: string): Product[] {
    // if(!value) return null
    if(!args) return value

    args = args.toLocaleLowerCase()

    return value.filter((item : any) => {
      return JSON.stringify(item).toLowerCase().includes(args!)
    })
  }

}
