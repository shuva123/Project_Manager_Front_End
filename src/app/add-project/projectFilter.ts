import { PipeTransform, Pipe } from '@angular/core';
import { viewProject } from './Project';


@Pipe({
    name: 'projectFilter'
})
export class projectFilterPipe implements PipeTransform {
    transform(projects: viewProject[], searchTerm: string): viewProject[] {
        if (!projects || !searchTerm) {
            return projects;
        }

        return projects.filter(project =>
            project.ProjectName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            || project.TaskCount.toString().indexOf(searchTerm) !== -1
            || project.CompletedTaskCount.toString().indexOf(searchTerm) !== -1
            || project.Priority.toString().indexOf(searchTerm) !== -1); 
    }
}