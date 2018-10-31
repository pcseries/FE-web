import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({ 'token': '313e3e42a3273e43577968f8732164c3'});

  getUser(): Observable<any> {
    return this.http.get('http://158.108.207.7:8282/ecom/api/emarket/user/' , {headers: this.httpHeaders});
  }
}
