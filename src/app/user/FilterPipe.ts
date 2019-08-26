import { PipeTransform, Pipe } from '@angular/core';
import { User } from './shared/user';
import { Projects } from '../add-project/project';
import { ParentTask } from '../parent-task';
import { Task } from '../task/task';

@Pipe({
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
    transform(users: User[], searchTerm: string): User[] {
        if (!users || !searchTerm) {
            return users;
        }

        return users.filter(user =>
            (user.First_Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            || (user.Last_Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            ||  (user.Employee_ID.toString().indexOf(searchTerm) !== -1));
    }
}
@Pipe({
    name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {
    transform(projects: Projects[], searchTerm: string): Projects[] {
        if (!projects || !searchTerm) {
            return projects;
        }

        return projects.filter(project =>
            (project.ProjectName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            ||  (project.Priority.toString().indexOf(searchTerm) !== -1));
    }
}
@Pipe({
    name: 'taskFilter'
})
export class ParentTaskFilterPipe implements PipeTransform {
    transform(parentTasks: ParentTask[], searchTerm: string): ParentTask[] {
        if (!parentTasks || !searchTerm) {
            return parentTasks;
        }

        return parentTasks.filter(parentTask =>
            (parentTask.Parent_Task.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)); 
    }
}

@Pipe({
    name: 'taskFilterBasedOnProject'
})
export class TaskFilterBasedOnProjectPipe implements PipeTransform {
    transform(Tasks: Task[], Project_ID: number): Task[] {
        if (!Tasks || !Project_ID) {
            return Tasks;
        }
        return Tasks.filter(Task =>
            (Task.Project_ID.toString().indexOf(Project_ID.toString()) !== -1)); 
    }
}