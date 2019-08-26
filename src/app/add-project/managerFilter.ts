import { PipeTransform, Pipe } from '@angular/core';
import { managerModalData } from './Project';


@Pipe({
    name: 'managerFilter'
})
export class managerFilterPipe implements PipeTransform {
    transform(users: managerModalData[], searchTerm: string): managerModalData[] {
        if (!users || !searchTerm) {
            return users;
        }

        return users.filter(user =>
            user.First_Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            || user.Last_Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            || user.Employee_ID.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}