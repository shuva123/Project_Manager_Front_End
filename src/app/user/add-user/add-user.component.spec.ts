import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { orderByPipe } from 'src/app/OrderByPipe';
import { UserFilterPipe } from '../FilterPipe';
import { User } from '../shared/user';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let testBedService: UserService;
  let pipeSpy1: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule,FormsModule,HttpClientModule,ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ AddUserComponent,orderByPipe,UserFilterPipe ],
      providers: [UserService,FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService=TestBed.get(UserService);
    pipeSpy1 = spyOn(orderByPipe.prototype, 'transform');
    pipeSpy1 = spyOn(UserFilterPipe.prototype, 'transform');
  });

  // it('should create user component', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should get user details searched for after Angular calls showForEdit', () =>
  // fakeAsync(() => {
  //   const updateduser: User ={
  //     User_ID:1,
  //     Employee_ID : 1,
  //     First_Name:'FName',
  //     Last_Name:'LName',
  //     Task_ID:1,
  //     Project_ID:1
  //       }
  //   component.showForEdit(updateduser);
  //   expect(testBedService.selectedUser.First_Name.length).toBeGreaterThan(1);
  //   expect(testBedService.selectedUser.First_Name).not.toBe(null);
  // }));

  // it('should get all User details on ngOnInit', () =>
  // fakeAsync(() => {
  //   //component.ngOnInit();
  //   spyOn(testBedService, 'getUserList');
  //   component.ngOnInit();
  //   expect(testBedService.getUserList).toHaveBeenCalled();
  //   //expect(testBedService.userList.length).toBeGreaterThan(1);
  //   //expect(testBedService.userList).not.toBe(null);
  // }));

  // it('should call the onDelete service method', () => fakeAsync(() => {
  //   //component.ngOnInit();
  //   //fixture.detectChanges();
  //   spyOn(testBedService, 'deleteUser').and.returnValue(new Observable<any>());
  //   //component.onDelete(1);

  //   fixture.debugElement.query(By.css('.text-danger')).triggerEventHandler('submit', 1);     

  //   expect(testBedService.deleteUser).toHaveBeenCalled();
  // }));

});
