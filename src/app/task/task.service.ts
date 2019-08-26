import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Task } from './task';
import { ParentTask } from '../parent-task';
import { User } from '../User/shared/user';
import { HttpClient } from '@angular/common/http';
import { TaskView } from '../task-view';
import {Projects} from '../add-project/Project'

@Injectable({
  providedIn: 'root'
})  
export class TaskService {
selectedTask:Task;
public taskList : Task[];
public projectList : Projects[];
public parentTaskList : ParentTask[];
public task_id:string;
public userList:User[];
url='http://172.18.2.172:5555/api/Tasks/';
projecturl='http://172.18.2.172:5555/api/Projects/';
parentTaskurl='http://172.18.2.172:5555/api/Parent_Task/';
userurl='http://172.18.2.172:5555/api/Users/';
  constructor(private http:Http,private http1:HttpClient) { }
  postTask(task:Task){
    var body=JSON.stringify(task);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(this.url,body,requestOptions).map(x=>x.json());
  }
  putTask(task_id, task) {
    var body = JSON.stringify(task);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.url + task_id,
      body,
      requestOptions).map(res => res.json());
  }
  getTaskList(){
    this.http.get(this.url)
    .map((data : Response) =>{
      return data.json() as Task[];
    }).toPromise().then(x => {
      this.taskList = x;
    })
  }
  getProjectList(){
    this.http.get(this.projecturl)
    .map((data : Response) =>{
      return data.json() as Projects[];
    }).toPromise().then(x => {
      this.projectList = x;
    })
  }
  getParentTaskList(){
    this.http.get(this.parentTaskurl)
    .map((data : Response) =>{
      return data.json() as ParentTask[];
    }).toPromise().then(x => {
      this.parentTaskList = x;
    })
  }
  deleteTask(id: number) {
    return this.http.delete(this.url + id).map(res => res.json());
  }
  postParent_Task(parentTask:ParentTask)
  {
    var body=JSON.stringify(parentTask);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(this.parentTaskurl,body,requestOptions).map(x=>x.json());
  }
  getParticularUser(user_id:number):Observable<User>{
    return this.http1.get<User>(this.userurl+user_id);
    }
    getParticularTask(task_id:number):Observable<TaskView>{
      return this.http1.get<TaskView>(this.url+task_id);
      }
  }
  

