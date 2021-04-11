import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl='https://localhost:44322/api/users/';
  constructor(private httpClient:HttpClient) { }

  getUserByMail(email:string){
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + 'getbymail?email='+email);
  }
  getById(userId:number):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + 'getbyid?id='+userId);
    }
}
