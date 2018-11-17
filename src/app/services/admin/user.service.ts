import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { ReturnStatement } from '@angular/compiler';
import { Member } from 'src/app/models/member';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({ 'token': '313e3e42a3273e43577968f8732164c3'});// get token มา

  baseUrlBS: string = environment.apiUrlBS;

  getUser(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'users' , {headers: this.httpHeaders});
  }

  getAdmin(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'admin', this.getAuth());
  }

   deleteUser(body: any): Observable<any> {
     return this.http.delete(this.baseUrlBS + 'users/' + body, this.getAuth());
  }

  blokUser(user: User): Observable<any> {
    return this.http.put(this.baseUrlBS + 'admin/banneduser', user , this.getAuth());
  }

  unblockUser(user: User): Observable<any> {
    return this.http.put(this.baseUrlBS + 'admin/unbanneduser', user , this.getAuth());
  }

  getImage(): Observable<Blob> {
    return  this.http.get(this.baseUrlBS + 'picprofiles', {responseType: 'blob' , headers: this.getAuthImage()});
  }

  getUser_one(username: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'username/' + username , this.getHeader());
  }

  getImageUser_one(username: any): Observable<Blob> {
    return this.http.get(this.baseUrlBS + 'picprofiles/' + username , {responseType: 'blob', headers: this.getAuthImage()});
  }

  editMember(user: any , member: Member): Observable<any> {
     return this.http.put(this.baseUrlBS + 'users/' + user, member , this.getAuth());
  }

  private getAuth() {
    const conttent = 'application/json; charset=utf-8';
    const token = '313e3e42a3273e43577968f8732164c3';// เปลี่ยนเป็น gettoken มาเเทน
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }



  private getAuthImage() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'token': token});
    return  httpheaders ;
  }

  private getHeader() {
    const token = '313e3e42a3273e43577968f8732164c3';
    const httpheaders = new HttpHeaders({'token': token});
    return {headers: httpheaders};
  }
}
