import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy' })
export class orderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        records = records || [];
        return records.sort(function(a, b){
            if(a[args.property] < b[args.property]){
                return -1 * args.direction;
            }
            else if( a[args.property] > b[args.property]){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}