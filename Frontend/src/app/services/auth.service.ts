import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import {map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://localhost:3200/api";
  id: string="";
  name: string="";
  constructor( private http:HttpClient) { }
  signUp(auth:any){
    return this.http.post(this.url+"/register", auth);
    
  }
  signIn(auth:any) {
    return this.http.post(this.url + '/login', auth);
      
  }
}
