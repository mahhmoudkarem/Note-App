import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly httpClient = inject(HttpClient)

  userSignin(data:any):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}users/signUp` , data)
  }
  userLogin(data:any):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}users/signIn`,data)
  }
}
