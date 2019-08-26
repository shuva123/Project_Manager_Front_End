import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PipeTransform, Pipe, inject } from '@angular/core';
import { AddProjectComponent } from './add-project.component';
import { ProjectService } from '../project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { projectFilterPipe } from './projectFilter';
import { orderByPipe } from '../OrderByPipe';
import { HttpModule } from '@angular/http';
import { ToastrService, TOAST_CONFIG, ToastContainerModule, Toast, ToastrModule } from 'ngx-toastr';
import { managerFilterPipe } from './managerFilter';
import { By } from '@angular/platform-browser';
import { UrlResolver } from '@angular/compiler';
import { HttpTestingController } from '@angular/common/http/testing';


describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let testBedService: ProjectService;
  let pipeSpy1: jasmine.Spy;
  let form:NgForm;

  //  form=new NgForm([
  //   new FormControl('Project_ID', Validators.required),
  //   new FormControl('ProjectName',null),  
  //   new FormControl('Start_Date',null),
  //   new FormControl('End_Date',null),
  //   new FormControl('Priority',null),
  //   new FormControl('Employee_Name',null),       
  //   new FormControl('Employee_ID',null)
  // ],
  // []);  
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule,FormsModule,HttpClientModule,ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ AddProjectComponent,projectFilterPipe,orderByPipe,managerFilterPipe],
      providers: [ProjectService,FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    testBedService=TestBed.get(ProjectService);
    pipeSpy1 = spyOn(orderByPipe.prototype, 'transform');
    pipeSpy1 = spyOn(projectFilterPipe.prototype, 'transform');
    pipeSpy1 = spyOn(managerFilterPipe.prototype, 'transform');
    fixture.detectChanges();
  });

  // it('should create add project component', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should get specific project details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    // component.ngOnInit();
    // fixture.detectChanges();
    component.showForEdit(1);
    expect(component.projects.ProjectName).toBeGreaterThan(1);
    expect(component.projects.ProjectName).not.toBe(null);
  }));

 it('should get all project details searched for on Search Project to be updated', () =>
  fakeAsync(() => {
    component.ngOnInit();
    component.getProjects();
    expect(component.projectList.length).toBeGreaterThan(1);
    expect(component.projectList.length).not.toBe(null);
  }));

  it('should get user details upon search button click', () =>
  fakeAsync(() => {
    component.ngOnInit();
    component.getAllUsers();
    expect(component.userList.length).toBeGreaterThan(1);
    expect(component.userList).not.toBe(null);
  })); 

  it('should call the endProject service method', () => fakeAsync(() => {
    spyOn(testBedService, 'endProject');
    component.ProjectForm.controls['Project_ID'].setValue(1);
    component.ProjectForm.controls['IsCompleted'].setValue('Y');
    component.endProject(component.ProjectForm);

    fixture.debugElement.query(By.css('.btn-end')).triggerEventHandler('submit', null);     

    expect(testBedService.endProject).toHaveBeenCalled();
  }));


  //  it('should call the addProject service method', fakeAsync(() => {

  //   fixture.detectChanges();
  //   spyOn(testBedService, 'addProject');
    
  //   form.controls['ProjectName'].setValue('Test Project');
  //   form.controls['Start_Date'].setValue(new Date(2019,7,5));
  //   form.controls['End_Date'].setValue(new Date(2019,7,6));
  //   form.controls['Priority'].setValue(12);
  //   form.controls['Employee_Name'].setValue('');
  //   form.controls['Employee_ID'].setValue('');
  //   form.controls['Project_ID'].setValue(null);

  //   fixture.debugElement.query(By.css('.project-form')).triggerEventHandler('submit', null);     
    
  //   expect(testBedService.addProject).toHaveBeenCalled();
  // })); 

});
