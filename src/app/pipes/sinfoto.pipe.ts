import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform( images: any[] ): any {

    const noImage = '/assets/img/noimage.png';

     if ( !images ){
       return '/assets/img/noimage.png';
     }

    return ( images.length > 0 ) ? images[1].url : noImage;
  }

}
