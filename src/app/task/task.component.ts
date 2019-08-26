import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { UserService } from '../user/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Task } from './task';
import { User } from '../User/shared/user';
import { setDefaultService } from 'selenium-webdriver/opera';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(public taskService:TaskService,public userService:UserService,public toastr:ToastrService,public route: ActivatedRoute) { }
  mdlUserIsOpen:boolean=false;
  mdlProjectIsOpen:boolean=false;
  mdlParentTaskIsOpen:boolean=false;
  today:string;
  userForm:any;
  userId:number;
  parentTaskId:number;
  parentTask:string;
  projectId:number;
  searchTerm:string;
  isDisabled=false;
  status:string;
  id:number;
  tasks:Task;
  userList:User;
  tempDate:Date;
  tomorrow:string;
  ngOnInit() {
      this.setDate();
      this.resetForm();
  }
  getTodayDate():string
  {
   return new Date().toISOString().split('T')[0];
  }
  setDate(){
    this.today= new Date().toISOString().split('T')[0];
    this.tempDate=new Date();
    this.tempDate.setDate(this.tempDate.getDate() + 1);
    this.tomorrow= this.tempDate.toISOString().split('T')[0];
  }
  disableFields()
{
  this.isDisabled=!this.isDisabled;
  if((<HTMLInputElement>document.getElementById("chkParent")).checked==false  && this.today=="" && this.tomorrow==""){
    this.setDate();
    this.projectId=null;
  }
  else{
    this.today="";
    this.tomorrow="";
  }
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
resetForm(form?:NgForm){
  (<HTMLInputElement>document.getElementById("btn_Submit")).innerHTML="<i class='fa fa-floppy-o'></i> Add";
  (<HTMLInputElement>document.getElementById("txt_ParentTaskName")).value="";
  (<HTMLInputElement>document.getElementById("txt_ProjectName")).value="";
  (<HTMLInputElement>document.getElementById("txt_UserName")).value="";

  if(form!=null)
  form.reset();
  (<HTMLInputElement>document.getElementById("chkParent")).checked=false;
  this.isDisabled=false;
  this.taskService.selectedTask={
    Task_ID :null,
    Parent_ID :null,
    Project_ID:null,
    Task1 :'',
    Start_Date:'',
    End_Date:'',
    Priority:0,
    Status:'',
    User_ID:null
  }
  this.setDate();
}
onSubmit(form: NgForm) { 

  if(this.isDisabled==false)
  {
    if  ((<HTMLInputElement>document.getElementById("txt_ParentTaskName")).value!=""
     && (<HTMLInputElement>document.getElementById("txt_ProjectName")).value!=""
     && (<HTMLInputElement>document.getElementById("txt_UserName")).value!=""
     && (<HTMLInputElement>document.getElementById("task_name")).value!="")
     {
      this.taskService.postTask(form.value)
      .subscribe(data => {
        this.taskService.getParticularUser(this.userId).subscribe(x=>
        this.userService.putParticularUser(x,data.Task_ID).subscribe(x=>{})); 
        this.resetForm(form);        
        this.toastr.success('Task Added Succcessfully', 'Task Register');
      })
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
        this.resetForm(form);
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
