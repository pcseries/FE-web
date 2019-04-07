import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrlBS: string = environment.apiUrlBS;
  baseUrlSan: string = environment.apiUrlC;

  get_address(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'address', this.getAuth());
  }

  get_addressbyId(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'address/' + id, this.getAuth());
  }

  create_address(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'address', data , this.getAuth_user());
  }

  cancel_order(data: any): Observable<any> {
    return this.http.put(this.baseUrlSan + 'orderitem/', data, this.getAuth());
  }

  delete_address(id: any): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'address/' + id, this.getAuth());
  }

  update_address(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'address', data, this.getAuth());
  }

  setaddress_default(id: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'address/default/' + id, null , this.getAuth_user());
  }

  getseller_products(): Observable<any> {
    return this.http.get(this.baseUrlSan + 'orderforseller/', this.getAuth());
  }



  private getAuth() {
    const token = localStorage.getItem('token');
    const name = 'multipart/form-data';
    const httpheaders = new HttpHeaders({ 'token': token, 'mimeType': name});
    return { headers: httpheaders };
  }


  getAuth_user() {
    const token = localStorage.getItem('token');
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }


}
