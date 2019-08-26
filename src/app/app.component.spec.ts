import { TestBed, async, inject, fakeAsync, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, Routes, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { TaskComponent } from './task/task.component';
import { AddUserComponent } from './user/add-user/add-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'} ,
  {path:'add-project', component:AddProjectComponent },
  {path:'add-task', component:TaskComponent },
  {path:'add-user', component:AddUserComponent },
  {path:'view-task', component:ViewTaskComponent },
  {path:'update-task/:id', component:UpdateTaskComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('project-manager');
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Project Manager');
  });

  it('should contain a Router Outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(compiled).not.toBe(null);
  });

  it('should have router link to Project Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/add-project')
    expect(index).toBeGreaterThan(-1);
  });

  it('should have router link to User Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/add-user')
    expect(index).toBeGreaterThan(-1);
  });

  it('should have router link to Task Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/task')
    expect(index).toBeGreaterThan(-1);
  });

  it('should have router link to view Task Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/view-task')
    expect(index).toBeGreaterThan(-1);
  });
});
