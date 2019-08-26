import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'q';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  direction: number;
  isDesc: boolean = false;
  column: string = 'Start_Date';
  mdlProjectIsOpen:boolean=false;
  searchTerm:string;
  projectId:number;
  TaskForm: Task;
  Project_ID:number;
  constructor(public taskService:TaskService,public toastr:ToastrService) { }

  ngOnInit() {
    this.taskService.getTaskList();
  }
  sort(property:string){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
  public openProjectModal(open : boolean) : void {
    this.mdlProjectIsOpen=open;
    (<HTMLInputElement>document.getElementById("Project_Search")).value="";
    this.searchTerm="";
    this.projectId=null;
    this.taskService.getProjectList();
}
pickProject(name:string,id:number)
{
  this.openProjectModal(false);
  this.projectId=id;
  (<HTMLInputElement>document.getElementById("Project_Search")).value=name;
}
onStop(task_id:number){
    this.taskService.getParticularTask(task_id).subscribe(x=>
    this.taskService.putTask(task_id,this.TaskForm={     
      Task_ID:task_id,
      Project_ID:x[0].Project_ID,
      Parent_ID:x[0].Parent_ID,
      Task1 :x[0].Name,
      Start_Date:x[0].Start_Date,
      End_Date:x[0].End_Date,
      Priority:x[0].Priority,
      Status:"Completed",
      User_ID:x[0].User_ID
       }
    ).subscribe(x=>x));
    this.toastr.success('Task Ended Succcessfully', 'Task Completion');
    (async () => { 
      // Do something before delay
  
      await delay(2000);
      window.location.reload();
  
  })();
 
}
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
}
