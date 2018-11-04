import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  baseUrlBS: string = environment.apiUrlBS;

  addAdmin(adminData: any): Observable<any> {
    return this.http.post('http://158.108.207.7:8181/ecom/api/emarket/admins', adminData , this.getAuthHeader());
  }

  private getAuthHeader() {
    const conttent = 'application/json; charset=utf-8';
    const token = '313e3e42a3273e43577968f8732164c3';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }
}
