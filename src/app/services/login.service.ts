import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }


  baseUrlC: string = environment.apiUrlC;
  baseUrlBS: string = environment.apiUrlBS;

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'login', userData, this.getAuthlogin());
  }

  getProduct(): Observable<any> {
    return this.http.get(this.baseUrlC + 'product/', this.getAutprodtuct() );
  }

  private getAutprodtuct() {
    const token = '1a2b3c';
    const httpheaders = new HttpHeaders({'token': token});
    return { headers: httpheaders };
  }

  private getAuthlogin() {
    const conttent = 'application/json; charset=utf-8';
    const token = '1q2w3e4r5t6y7u8i';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }

}
