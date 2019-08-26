import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { Projects, viewProject, managerModalData } from './Project';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers:[ProjectService,ToastrService]
})
export class AddProjectComponent implements OnInit {

  dataSaved = false;  
  ShowProject:any;
  ShowProject_ID:any;
  ShowEmployee_ID:any;
  ShowPriority:any;
  ShowStart_Date:any;
  ShowEnd_Date:any;
  ProjectForm: any;  
  projectIdUpdate = null;  
  message = null;
  id:number;
  public projects:Projects;
  projectList:viewProject[];
  userList:managerModalData[];
  isManagerModalOpen:boolean=false;
  direction: number;
  isDesc: boolean = false;
  column: string = 'Start_Date';
  searchTerm:string;
  isDisabled:boolean=true;
  empID:string;
  StartDate:Date;
  tempDate:Date;
  EndDate:Date;

  constructor(public projectservice:ProjectService,public route: ActivatedRoute,public toastr:ToastrService) { }

  ngOnInit():void {
    this.resetForm();
    this.getProjects();
  }

  getProjects(): void {
    this.projectservice.getAllProject().subscribe(resultArray => {  
    this.projectList = resultArray;}); 
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
      (<HTMLInputElement>document.getElementById("chk_Dates")).checked=false;
      this.isDisabled=true;
      this.projectservice.selectedProject = {
      Project_ID: null,
      ProjectName: "",
      Priority: "0",
      Start_Date: null,
      End_Date: null,
      Employee_Name: "",
      Employee_ID: null
    }
  }

  getAllUsers(){
    this.resetUserModal(true);
    this.userList=[];
    this.projectservice.getAllUser().subscribe(resultArray => {  
    this.userList = resultArray;});
  }

  sort(property:string){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

  resetUserModal(option:boolean):void{
    this.searchTerm="";
    (<HTMLInputElement>document.getElementById("searchModal")).value= "";
    this.isManagerModalOpen=option;
  }

  populateEmpId(id:string,firstName:string,lastName:string){
    this.resetUserModal(false);
  (<HTMLInputElement>document.getElementById("Manager")).value= firstName+" "+lastName;
    this.empID= id;
  }

  manageDisabled(){
    this.isDisabled=!this.isDisabled;
    if((<HTMLInputElement>document.getElementById("chk_Dates")).checked && this.StartDate==null && this.EndDate==null){
      this.ShowStart_Date= new Date().toISOString().split('T')[0];
      this.tempDate=new Date();
      this.tempDate.setDate(this.tempDate.getDate() + 1);
      this.ShowEnd_Date= this.tempDate.toISOString().split('T')[0];
    }
    if(!(<HTMLInputElement>document.getElementById("chk_Dates")).checked)
    {
      this.ShowStart_Date="";
      this.ShowEnd_Date="";
      this.StartDate=null;
      this.EndDate=null;
    }
  }

  addProject(form:NgForm) {
    
    if(form.value.Employee_ID==undefined)
      {
        form.value.Employee_ID="";
      } 
    if(form.value.Project_ID==null)
    {
    this.projectservice.addProject(form.value).subscribe(  
      () => {  
        this.dataSaved = true;      
        this.getProjects();
        this.resetForm(form);
        (<HTMLInputElement>document.getElementById("Manager")).value= "";
        this.empID= "";
        this.message = 'Project Added Successfully'; 
        this.toastr.success(this.message, 'Project Addition');
      },
      error => console.error(error)
    ); 
  }
  else if(form.value.Project_ID!=null)
    {
      this.projectservice.updateProject(form.value).subscribe(  
      () => {  
          this.dataSaved = true;   
          this.getProjects();
          this.resetForm(form);
          (<HTMLInputElement>document.getElementById("Manager")).value= "";
          this.empID= "";
          this.message = 'Project updated Successfully';
          this.toastr.success(this.message, 'Project Update');
          (<HTMLInputElement>document.getElementById("btnSubmit")).innerHTML="<i class='fa fa-floppy-o'></i> Add";
      },
      error => console.error(error)
    ); 
  }
}

showForEdit(projectId: Number) {
  this.projectservice.getProjectById(projectId).subscribe(data=>{this.projects=data,this.SetValuesForEdit(this.projects)});
  (<HTMLInputElement>document.getElementById("btnSubmit")).innerHTML="<i class='fa fa-floppy-o'></i> Update";
}

SetValuesForEdit=function(project:Projects)  
{ 
  this.ShowProject_ID=project[0].Project_ID;
  this.ShowProject=project[0].ProjectName; 
  if(project[0].Start_Date!=null || project[0].End_Date!=null)
  {
    (<HTMLInputElement>document.getElementById("chk_Dates")).checked=true;
    this.isDisabled=false;
  }
  if(project[0].Start_Date!=null)
  {
    this.StartDate = new Date(project[0].Start_Date);
    this.StartDate.setMinutes(this.StartDate.getMinutes() + 330); 
    this.ShowStart_Date=this.StartDate.toISOString().split('T')[0];
  }
  
  if(project[0].End_Date!=null) 
  {
    this.EndDate= new Date(project[0].End_Date);
    this.EndDate.setMinutes(this.EndDate.getMinutes() + 330);
    this.ShowEnd_Date=this.EndDate.toISOString().split('T')[0];
  }

  this.ShowPriority=project[0].Priority;  
  this.ShowEmployee_ID=project[0].Employee_ID;  
  (<HTMLInputElement>document.getElementById("Manager")).value= project[0].Employee_Name;
}

resetData(form?: NgForm){
  this.resetForm(form);
  (<HTMLInputElement>document.getElementById("btnSubmit")).innerHTML="<i class='fa fa-floppy-o'></i> Add";
}

endProject(id:string) {  
    this.ProjectForm = {  
      Project_ID: id, 
      IsCompleted: 'Y'
    };
    this.projectservice.endProject(this.ProjectForm).subscribe(  
    () => {  
        this.dataSaved = true; 
        this.message='Project Ended Successfully';  
        this.toastr.success(this.message, 'Project Suspend');
        this.getProjects();
      },
    error => console.error(error)
    );
  }
}
