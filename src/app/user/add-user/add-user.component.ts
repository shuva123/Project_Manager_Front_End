import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

  direction: number;
  searchTerm:any;
  isDesc: boolean = false;
  column: string = 'Employee_ID';
  constructor(public userService:UserService,public toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getUserList();
  }
resetForm(form?:NgForm){
  (<HTMLInputElement>document.getElementById("btnSubmit1")).innerHTML="<i class='fa fa-floppy-o'></i> Add";
  if(form!=null)
form.reset();
this.userService.selectedUser={
  User_ID:null,
  Employee_ID:null,
  First_Name:'',
  Last_Name:'',
  Project_ID:null,
  Task_ID:null
}
}
onSubmit(form: NgForm) { 

  if (form.value.User_ID == null) {
    this.userService.postUser(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.userService.getUserList();
        this.toastr.success('User Added Succcessfully', 'User Register');
      })
  }
  else {
    this.userService.putUser(form.value.User_ID, form.value)
    .subscribe(data => {
      this.resetForm(form);
      this.userService.getUserList();
      this.toastr.info('User Updated Successfully!', 'User Updation');
      (<HTMLInputElement>document.getElementById("btnSubmit1")).innerHTML="<i class='fa fa-floppy-o'></i> Add";
    });
  }
}
showForEdit(user: User) {
  this.userService.selectedUser = Object.assign({}, user);
  (<HTMLInputElement>document.getElementById("btnSubmit1")).innerHTML="<i class='fa fa-floppy-o'></i> Update";
}

onDelete(id: number) {
  if (confirm('Are you sure to delete this user ?') == true) {
    this.userService.deleteUser(id)
    .subscribe(x => {
      this.userService.getUserList();
      this.toastr.warning("Deleted Successfully","User Deletion");
    })
  }
}
sort(property){
  this.isDesc = !this.isDesc; //change the direction    
  this.column = property;
  this.direction = this.isDesc ? 1 : -1;
}

}