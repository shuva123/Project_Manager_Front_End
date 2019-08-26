import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { TaskView } from '../task-view';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  userId:number;
  parentTaskId:number;
  parentTask:string;
  projectId:number;
  mdlUserIsOpen:boolean=false;
  mdlProjectIsOpen:boolean=false;
  mdlParentTaskIsOpen:boolean=false;
  searchTerm: string;
  tasks:TaskView;
  id:number;
  Task: string;
  Parent_Task_Name: string;
  StartDate: string;
  Project_Name: string;
  EndDate: any;
  Priority1: any;
  isDisabled:boolean=false;
  Status1: any;
  Taskid: any;
  constructor(public taskService:TaskService,public userService:UserService,public toastr:ToastrService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm()
  {
    this.id=this.route.snapshot.params['id'];
    this.taskService.getParticularTask(this.id).subscribe(data=>{this.tasks=data,this.SetValuesForEdit(this.tasks)});
  }
  disableFields()
  {
    this.isDisabled=!this.isDisabled;
    return;
  }
openProjectModal(open : boolean) : void {
    this.mdlProjectIsOpen=open;
    (<HTMLInputElement>document.getElementById("Project_Search")).value="";
    this.searchTerm="";
    this.taskService.getProjectList();
}
openUserModal(open : boolean) : void {
  this.mdlUserIsOpen=open;
  (<HTMLInputElement>document.getElementById("User_Search")).value="";
  this.searchTerm="";
  this.userService.getUserList();
}
openParentTaskModal(open:boolean):void{
  this.mdlParentTaskIsOpen=open;
  (<HTMLInputElement>document.getElementById("Parent_Task_Search")).value="";
  this.searchTerm="";
  this.taskService.getParentTaskList();
}
pickProject(name:string,id:number)
{
  this.openProjectModal(false);
  (<HTMLInputElement>document.getElementById("txt_ProjectName")).value=name;
  this.projectId=id;
}
pickUser(first_name:string,last_name:string,id:number)
{
  this.openUserModal(false);
  (<HTMLInputElement>document.getElementById("txt_UserName")).value=first_name + " " + last_name;
  this.userId=id;
}
pickParentTask(task_name:string,id:number)
{
  this.openParentTaskModal(false);
  (<HTMLInputElement>document.getElementById("txt_ParentTaskName")).value=task_name;
  this.parentTaskId=id;
}
SetValuesForEdit(task:TaskView){
this.Taskid=task[0].Id;
this.userId=task[0].UserId;
this.projectId=task[0].Project_ID;
this.parentTaskId=task[0].Parent_ID;
this.Task=task[0].Name;
this.Status1=task[0].Status;
this.StartDate=task[0].Start_Date.split('T')[0];
if(task[0].End_Date!=null)
this.EndDate=task[0].End_Date.split('T')[0];
else
this.EndDate=task[0].End_Date;
this.Priority1=task[0].Priority;
(<HTMLInputElement>document.getElementById("txt_ParentTaskName")).value=task[0].Parent_Task_Name;
(<HTMLInputElement>document.getElementById("txt_ProjectName")).value=task[0].Project_Name;
(<HTMLInputElement>document.getElementById("txt_UserName")).value=task[0].UserFirstName==null?"": task[0].UserFirstName+
 " " + task[0].UserLastName==null?"":task[0].UserLastName;
}
onSubmit(form: NgForm) { 
  if(this.isDisabled==false)
  {
    if  ((<HTMLInputElement>document.getElementById("txt_ParentTaskName")).value!=""
     && (<HTMLInputElement>document.getElementById("txt_ProjectName")).value!=""
     && (<HTMLInputElement>document.getElementById("txt_UserName")).value!=""
     && (<HTMLInputElement>document.getElementById("task_name")).value!="")
    {
      this.taskService.putTask(form.value.Task_ID,form.value).subscribe(x=>x);
      this.taskService.getParticularUser(this.userId).subscribe(x=>
        this.userService.putParticularUser(x,form.value.Task_ID).subscribe(x=>{})); 
        this.toastr.success('Task Updated Succcessfully', 'Task Updation');
        window.location.href="/view-task";
    }
    else
    {
      this.toastr.warning('Please input value into all mandatory fields');
    }
  }
  else
  {
    if((<HTMLInputElement>document.getElementById("task_name")).value!="")
    {
      form.value.Parent_Task1=form.value.Task1;
      form.value.Task1=null;
    this.taskService.postParent_Task(form.value)
      .subscribe(data => {
        this.toastr.success('Parent Task Added Succcessfully', 'Parent Task Register');
      })
    }
    else
    {
      this.toastr.warning('Please input value into Task field');
    }
  }
}
}
