import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { endProject, managerModalData, viewProject, Projects } from './add-project/Project';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  
  selectedProject:Projects;
  projectList:viewProject[];
  selectedProjectById:Projects[];
  
  public url = 'http://172.18.2.172:5555/api/Projects';
  public urlUser=  'http://172.18.2.172:5555/api/Users';
  constructor(private http1: Http,private http: HttpClient) { }

   getAllProject():Observable<viewProject[]>{
  return this.http1
  .get(this.url)
  .map((response: Response) => {
      return <viewProject[]>response.json();
  })}

  getAllUser():Observable<managerModalData[]>{
    return this.http1
    .get(this.urlUser)
    .map((response: Response) => {
        return <managerModalData[]>response.json();
    })}

  getProjectById(projectId: Number): Observable<Projects> {  
    return this.http.get<Projects>(this.url + '/' + projectId);  
  } 

  addProject(project: Projects): Observable<Projects[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Projects[]>(this.url + '/',  
    project, httpOptions);  
  }

  updateProject(project: Projects): Observable<Projects[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Projects[]>(this.url + '/',  
    project, httpOptions);  
  }
  
  endProject(project: endProject): Observable<endProject[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<endProject[]>(this.url + '/',  
    project, httpOptions);  
  }
}
