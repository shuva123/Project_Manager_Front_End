import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { TaskComponent } from './task/task.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'} ,
  {path:'task', component:TaskComponent },
  {path:'view-task', component:ViewTaskComponent },
  {path:'add-user', component:AddUserComponent },
  {path:'update-task/:id', component:UpdateTaskComponent },
  {path:'add-project', component:AddProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
