import { TestBed, fakeAsync } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { ProjectService } from '../project.service';
import { Task } from './task';
import { User } from '../User/shared/user';
import { Projects } from '../add-project/Project';
import { ParentTask } from '../parent-task';

let service : TaskService
let httpMock: HttpTestingController
let ProjectList:Projects[]
let parentTaskList:ParentTask[]
let taskList:Task[]

describe('TaskService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,HttpModule ],
    providers: [TaskService]
  });
  service=TestBed.get(TaskService);
  httpMock=TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});


  it('task service should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should retrieve all tasks from API by getTaskList method via GET and should have one get request', () => fakeAsync(() => {
    const dummyPost: Task[] =[{
      Task_ID :1,
      Parent_ID :1,
      Project_ID:1,
      Task1 :'Task 1',
      Start_Date:'2019-08-09',
      End_Date:'2019-08-19',
      Priority:1,
      Status:'Completed',
      User_ID:1
  },
  {
    Task_ID :2,
    Parent_ID :2,
    Project_ID:2,
    Task1 :'Task 2',
    Start_Date:'2019-08-09',
    End_Date:'2019-08-19',
    Priority:1,
    Status:'Completed',
    User_ID:2
}];
    this.taskList=service.getTaskList()
    expect(this.taskList.length).toBe(2);
    expect(this.taskList).toEqual(dummyPost);
    const request=httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  }));


  it('should pass specific task to be inserted to API by postTask method via POST', () => fakeAsync(() => {
    const task: Task ={
      Task_ID :null,
      Parent_ID :1,
      Project_ID:1,
      Task1 :'Task 1',
      Start_Date:'2019-08-09',
      End_Date:'2019-08-19',
      Priority:1,
      Status:'Completed',
      User_ID:1
  }
      service.postTask(task).subscribe(posts => {
      });
      const request=httpMock.expectOne(`${service.url}`);
      expect(request.request.method).toBe('POST');
      request.flush(task);
}));

it('should pass specific task to be updated to API by putTask method via PUT', () => fakeAsync(() => {
  const updatedtask: Task ={
    Task_ID :1,
    Parent_ID :1,
    Project_ID:1,
    Task1 :'Task 1',
    Start_Date:'2019-08-09',
    End_Date:'2019-08-19',
    Priority:1,
    Status:'Completed',
    User_ID:1
}
    service.putTask(updatedtask,1).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedtask);
}));

it('should pass specific User to be deleted to API by deleteTask method via DELETE', () => fakeAsync(() => {
    service.deleteTask(1).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('DELETE');
}));

it('should retrieve all projects from API by getProjectList method via GET and should have one get request', () => fakeAsync(() => {
  const dummyPost: Projects[] =[{
  Project_ID:1,
  ProjectName: 'Test Project1',  
  Priority: '10',
  Start_Date: new Date(2019,7,5),
  End_Date: new Date(2019,7,6),
  Employee_Name:'',
    Employee_ID:null
  },
  {
    Project_ID: 2,
    ProjectName: 'Test Project2',  
    Priority: '12',
    Start_Date: new Date(2019,7,5),
    End_Date: new Date(2019,7,6),
    Employee_Name:'',
    Employee_ID:null
    }]
    //this.ProjectList= service.getProjectList();
    expect(service.projectList.length).toBe(2);
    expect(service.projectList).toEqual(dummyPost);
}));

it('should retrieve all parent tasks from API by getParentTaskList method via GET and should have one get request', () => fakeAsync(() => {
  const dummyPost: ParentTask[] =[{
    Parent_ID:1,
    Parent_Task:'Task1'
  },
  {
    Parent_ID:2,
    Parent_Task:'Task2'
    }]
    this.parentTaskList= service.getParentTaskList();
    expect(this.parentTaskList.length).toBe(2);
    expect(this.parentTaskList).toEqual(dummyPost);
}));

it('should post a parent tasks from API by postParent_Task method via POST and should have one get request', () => fakeAsync(() =>{
  const dummyPost: ParentTask ={
    Parent_ID:1,
    Parent_Task:'Task1'
  };
  service.postParent_Task(dummyPost).subscribe(posts => {
  });
  const request=httpMock.expectOne(`${service.url}`);
  expect(request.request.method).toBe('POST');
  request.flush(dummyPost);
}));

});
