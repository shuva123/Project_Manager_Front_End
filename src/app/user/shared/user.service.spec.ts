import { TestBed, fakeAsync } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { ProjectService } from 'src/app/project.service';
import { User } from './user';

let service : UserService
let httpMock: HttpTestingController
let userList:User[]

describe('UserService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,HttpModule ],
    providers: [UserService]
  });
  service=TestBed.get(UserService);
  httpMock=TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});

  it('User Service should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });


  it('should retrieve all users from API by getAllUser method via GET and should have one get request', () => fakeAsync(() => {
    const dummyPost: User[] =[{
      User_ID:null,
      Employee_ID : 1,
      First_Name:'FName',
      Last_Name:'LName',
      Task_ID:1,
      Project_ID:1
        },
        {
          User_ID:null,
          Employee_ID : 1,
          First_Name:'FName',
          Last_Name:'LName',
          Task_ID:1,
          Project_ID:1
            }];
    //this.userList=service.getUserList()
      expect(service.userList.length).toBe(2);
      expect(service.userList).toEqual(dummyPost);
    const request=httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  }));


  it('should pass specific user to be inserted to API by postUser method via POST', () => fakeAsync(() => {
    const user: User ={
      User_ID:null,
      Employee_ID : 379983,
      First_Name:'Soudipta',
      Last_Name:'Swar',
      Task_ID:1,
      Project_ID:1
        }
      service.postUser(user).subscribe(posts => {
      });
      const request=httpMock.expectOne(`${service.url}`);
      expect(request.request.method).toBe('POST');
      request.flush(user);
}));

it('should pass specific user to be updated to API by putParticularUser method via POST', () => fakeAsync(() => {
  const updateduser: User ={
    User_ID:1,
    Employee_ID : 1,
    First_Name:'FName',
    Last_Name:'LName',
    Task_ID:1,
    Project_ID:1
      }
    service.putParticularUser(updateduser,2).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('PUT');
    request.flush(updateduser);
}));

it('should pass specific User to be deleted to API by deleteUser method via POST', () => fakeAsync(() => {
    service.deleteUser(2).subscribe(posts => {
    });
    const request=httpMock.expectOne(service.url);
    expect(request.request.method).toBe('DELETE');
}));
});

