import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../task/task.service';
import { orderByPipe } from '../OrderByPipe';
import { TaskFilterBasedOnProjectPipe } from '../user/FilterPipe';
import { projectFilterPipe } from '../add-project/projectFilter';
import { By } from '@angular/platform-browser';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let testBedService: TaskService;
  let pipeSpy1: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule,FormsModule,HttpClientModule,ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ ViewTaskComponent,orderByPipe,TaskFilterBasedOnProjectPipe,projectFilterPipe ],
      providers: [TaskService,FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService=TestBed.get(TaskService);
    pipeSpy1 = spyOn(orderByPipe.prototype, 'transform');
    pipeSpy1 = spyOn(TaskFilterBasedOnProjectPipe.prototype, 'transform');
    pipeSpy1 = spyOn(projectFilterPipe.prototype, 'transform');
  });

  it('should create view task component', () => {
    expect(component).toBeTruthy();
  });

  it('should get specific project details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    component.pickProject('Project 1',1);
    expect(testBedService.selectedTask.Task1.length).toBeGreaterThan(1);
    expect(testBedService.selectedTask.Task1).not.toBe(null);
  }));

  it('should get all task details searched for on Search Task to be updated', () =>
  fakeAsync(() => {
    component.ngOnInit();
    expect(component.TaskForm.Task1.length).toBeGreaterThan(1);
    expect(component.TaskForm.Task1).not.toBe(null);
  }));

  it('should call the endProject service method', () => fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(testBedService, 'putTask');

    fixture.debugElement.query(By.css('.text-danger')).triggerEventHandler('submit', null);     

    expect(testBedService.putTask).toHaveBeenCalled();
  }));
});
