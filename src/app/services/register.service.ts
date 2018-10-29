import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'token': '1q2w3e4r5t6y7u8i'});
  baseUrlBS: string = environment.apiUrlBS;


  registerUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'users', userData, {headers: this.httpHeaders});
  }

}
