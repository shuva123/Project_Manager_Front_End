import { TestBed, fakeAsync } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { Projects, viewProject, managerModalData, endProject } from './add-project/Project';
import { HttpClientModule } from '@angular/common/http';

let service : ProjectService
let httpMock: HttpTestingController

describe('ProjectService', () =>{
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,HttpModule,HttpClientModule ],
    providers: [ProjectService]
  });
  service=TestBed.get(ProjectService);
  httpMock=TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});

  it('project service should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('should retrieve all projects from API by getAllProject method via GET and should have one get request', () => fakeAsync(() =>{
    const dummyPost: viewProject[] =[{
    Project_ID:1,
    ProjectName: 'Test Project1',  
    Priority: '10',
    Start_Date: '2019-7-5',
    End_Date: '2019-7-6',
    TaskCount:'2',
    CompletedTaskCount: '1',
    IsCompleted: ''
    }]
    service.getAllProject().subscribe(posts => {
      expect(posts.length).toBe(3);
      expect(posts).toEqual(dummyPost);
    });
  }));


  it('should retrieve all users from API by getAllUser method via GET and should have one get request', () => fakeAsync(() => {
    const dummyPost: managerModalData[] =[{
    Employee_ID:1,
    First_Name: 'FName1',  
    Last_Name: 'LName1' 
    },
    {
      Employee_ID:2,
      First_Name: 'FName2',  
      Last_Name: 'LName2'
      }]
    service.getAllUser().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPost);
    });
  }));


  it('should pass specific project to be inserted to API by addProject method via POST', () => fakeAsync(() => {
    const project: Projects ={
    Project_ID:1,
    ProjectName: 'Test Project1',  
    Priority: '10',
    Start_Date: new Date(2019,7,5),
    End_Date: new Date(2019,7,6),
    Employee_Name:'',
    Employee_ID:null
      }
      service.addProject(project).subscribe(posts => {
      });
      const request=httpMock.expectOne({ method: 'POST', url: 'http://172.18.2.172:5555/api/Projects/' });
      expect(request.request.method).toBe('POST');
      request.flush(project);
}));

it('should pass specific Project to be updated to API by updateProject method via POST', () => fakeAsync(() => {
  const updatedproject: Projects ={
    Project_ID:null,
    ProjectName: 'Test Project1',  
    Priority: '10',
    Start_Date: new Date(2019,7,5),
    End_Date: new Date(2019,7,6),
    Employee_Name:'',
    Employee_ID:null
      }
    service.updateProject(updatedproject).subscribe(posts => {
    });
    const request=httpMock.expectOne({ method: 'POST', url: 'http://172.18.2.172:5555/api/Projects/' });
    expect(request.request.method).toBe('POST');
    request.flush(updatedproject);
}));

it('should pass specific project to be ended to API by endProject method via POST', () => fakeAsync(() => {
  const endProject: endProject = {
    Project_ID:1,
    IsCompleted: 'Y'
    }
    service.endProject(endProject).subscribe(posts => {
    });
    const request=httpMock.expectOne({ method: 'POST', url: 'http://172.18.2.172:5555/api/Projects/' });
    expect(request.request.method).toBe('POST');
    request.flush(endProject);
}));
});
