import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Member } from 'src/app/models/member';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  baseUrlBS: string = environment.apiUrlBS;

  editProfile(member: Member): Observable<any> {
    console.log('mem' , member);
    return this.http.put(this.baseUrlBS + 'users', member, this.getAuthProfile());
  }

  private getAuthProfile() {
    const token = localStorage.getItem('token');

    const conttent = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }
}
