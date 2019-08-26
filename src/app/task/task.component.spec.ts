import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TaskService } from './task.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectFilterPipe, ParentTaskFilterPipe, TaskFilterBasedOnProjectPipe, UserFilterPipe } from '../user/FilterPipe';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let testBedService1: TaskService;
  let pipeSpy2: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule,FormsModule,HttpClientModule,ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ TaskComponent,ProjectFilterPipe,ParentTaskFilterPipe,UserFilterPipe ],
      providers: [TaskService,FormBuilder,ToastrService,TaskFilterBasedOnProjectPipe,UserFilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService1=TestBed.get(TaskService);
     pipeSpy2 = spyOn(ProjectFilterPipe.prototype, 'transform');
     pipeSpy2 = spyOn(ParentTaskFilterPipe.prototype, 'transform');
     pipeSpy2 = spyOn(TaskFilterBasedOnProjectPipe.prototype, 'transform');
     pipeSpy2 = spyOn(UserFilterPipe.prototype, 'transform');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get specific project details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    component.openProjectModal(true);
    expect(testBedService1.projectList.length).toBeGreaterThan(1);
    expect(testBedService1.projectList).not.toBe(null);
  }));

  it('should get specific user details searched for after Angular calls openUserModal', () =>
  fakeAsync(() => {
    component.openUserModal(true);
    expect(testBedService1.userList.length).toBeGreaterThan(1);
    expect(testBedService1.userList).not.toBe(null);
  }));

  it('should get specific project details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    component.openParentTaskModal(true);
    expect(testBedService1.parentTaskList.length).toBeGreaterThan(1);
    expect(testBedService1.parentTaskList).not.toBe(null);
  }));
});
