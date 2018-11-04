import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({ 'token': '313e3e42a3273e43577968f8732164c3'});// get token มา

  baseUrlBS: string = environment.apiUrlBS;

  getUser(): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/users' , {headers: this.httpHeaders});
  }

   deleteUser(body: any): Observable<any> {
     return this.http.delete(this.baseUrlBS + 'users/' + body, this.getAuth());
  }

  blokUser(user: User): Observable<any> {
    return this.http.put(this.baseUrlBS + 'admin/banneduser', user , this.getAuth());
  }

  private getAuth() {
    const conttent = 'application/json; charset=utf-8';
    const token = '313e3e42a3273e43577968f8732164c3';// เปลี่ยนเป็น gettoken มาเเทน
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }

}
