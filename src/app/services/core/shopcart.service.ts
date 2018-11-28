import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  constructor(private http: HttpClient) { }

  baseUrlC: string = environment.apiUrlC;
  baseUrlBS: string = environment.apiUrlBS;

  getOrder(): Observable<any> {
    return this.http.get(this.baseUrlC + 'order/', this.getAuth());
  }

  getAuth() {
    const token = '41194e0f3d47af7c8232f27d05da895d';
    const httpheaders = new HttpHeaders({ 'token': token});
    return { headers: httpheaders };
  }

}
