import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})  
export class UserService {
selectedUser:User;
public userList : User[];
url='http://172.18.2.172:5555/api/Users/';
  constructor(private http:Http,private http1:HttpClient) { }
  postUser(user:User){
    var body=JSON.stringify(user);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(this.url,body,requestOptions).map(x=>x.json());
  }
  putUser(user_id, user) {
    var body = JSON.stringify(user);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.url + user_id,
      body,
      requestOptions).map(res => res.json());
    }
  getUserList(){
    this.http.get(this.url)
    .map((data : Response) =>{
      return data.json() as User[];
    }).toPromise().then(x => {
      this.userList = x;
    })
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + id).map(res => res.json());
  }
  putParticularUser(user:User,task_id:number):Observable<User>{
    user.Task_ID=task_id;  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http1.put<User>(this.url + user.User_ID,user,httpOptions);
    }
}
