import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/shared/user.service';
import { projectFilterPipe } from '../add-project/projectFilter';
import { UserFilterPipe, TaskFilterBasedOnProjectPipe, ParentTaskFilterPipe } from '../user/FilterPipe';
import { TaskService } from '../task/task.service';
import { By } from '@angular/platform-browser';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let testBedService: UserService;
  let pipeSpy1: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule,FormsModule,HttpClientModule,ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ UpdateTaskComponent,projectFilterPipe,UserFilterPipe,ParentTaskFilterPipe ],
      providers: [TaskService,FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService=TestBed.get(TaskService);
    pipeSpy1 = spyOn(projectFilterPipe.prototype, 'transform');
    pipeSpy1 = spyOn(UserFilterPipe.prototype, 'transform');
    pipeSpy1 = spyOn(ParentTaskFilterPipe.prototype, 'transform');
  });

  it('should create update task component', () => {
    expect(component).toBeTruthy();
  });

});
