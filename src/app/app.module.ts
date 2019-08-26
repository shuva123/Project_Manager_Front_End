import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from './project.service';
import { HttpModule } from '@angular/http';
import { managerFilterPipe } from './add-project/managerFilter';
import { projectFilterPipe } from './add-project/projectFilter';
import { orderByPipe } from './OrderByPipe';
import { ToastrModule } from 'ngx-toastr';
import { TaskComponent } from './task/task.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { TaskService } from './task/task.service';
import { UserService } from './user/shared/user.service';
import { UserFilterPipe, TaskFilterBasedOnProjectPipe, ParentTaskFilterPipe, ProjectFilterPipe } from './user/FilterPipe';
import { OrderByPipe } from './user/OrderByPipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    AddProjectComponent,
    AddUserComponent,
    OrderByPipe,
    ProjectFilterPipe,
    managerFilterPipe,
    projectFilterPipe,
    UserFilterPipe,
    orderByPipe,
    ParentTaskFilterPipe,
    TaskFilterBasedOnProjectPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpModule,
    orderByPipe,
    projectFilterPipe,
    ProjectFilterPipe,
    OrderByPipe,
    managerFilterPipe,
    UserFilterPipe,
    HttpClientModule,
    UserService,
    TaskService,
    ProjectService,
    ParentTaskFilterPipe,
    TaskFilterBasedOnProjectPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
