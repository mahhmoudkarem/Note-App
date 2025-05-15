import { env } from './../../env/env';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly httpClient = inject(HttpClient)

  addNote(data:any):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}notes` , data)
  }

  getNotes():Observable<any>{
    return this.httpClient.get(`${env.baseUrl}notes/allNotes`)
  }

  getUserNotes():Observable<any>{
    return this.httpClient.get(`${env.baseUrl}notes`)
  }

  updateNote(id:string , data:any):Observable<any>{
    return this.httpClient.put(`${env.baseUrl}notes/${id}` ,data)
  }
  deleteNote(id:string ):Observable<any>{
    return this.httpClient.delete(`${env.baseUrl}notes/${id}`)
  }



}
