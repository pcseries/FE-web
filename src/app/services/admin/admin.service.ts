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

  get_decideProducts(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'order_history', this.getAuthAdmin());
  }

  get_decideProductByid(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'order_history/' + id, this.getAuthAdmin());
  }

  get_shippings(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'shipping', this.getAuthAdmin());
  }

  create_shipping(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'shipping', data, this.getAuthAdmin());
  }

  delete_shipping(id: any): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'shipping/' + id, this.getAuthAdmin());
  }

  update_shipping(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'shipping/', data , this.getAuthAdmin());
  }

  decide_product(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'order_history', data, this.getAuthAdmin());
  }

  get_category(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'catagories' , this.getAuthWeb());
  }


  get_paying(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'type/payments', this.getAuthAdmin());
  }

  add_paying(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'type/payments', data, this.getAuthAdmin());
  }

  delete_paying(id: any): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'type/payments/' + id, this.getAuthAdmin());
  }

  update_paying(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'type/payments', data , this.getAuthAdmin());
  }

  add_category(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'catagories', data, this.getAuthAdmin());
  }

  delete_category(id: any): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'catagories/' + id, this.getAuthAdmin());
  }

  update_category(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'catagories', data, this.getAuthAdmin());
  }


  get_subCategory(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'catagories/' + id, this.getAuthWeb());
  }

  add_package(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'addrecpackage', data, this.getAuthAdmin());
  }

  get_package(): Observable<any> {
    return  this.http.get(this.baseUrlBS + 'admin/recpackage', this.getAuthAdmin());
  }

  delete_package(id: any): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'recpackage/' + id, this.getAuthHeader());
  }

  edit_statusPackage(data: any): Observable<any> {
    return this.http.put(this.baseUrlBS + 'recpackage/', data, this.getAuthAdmin());
  }



  private getAuthWeb() {
    const conttent = 'application/json; charset=utf-8';
    const token = 'PC9OqYjEQ10c5W78T3ADxwPFe6BTDgTx';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }

  private getAuthHeader() {
    const conttent = 'application/json; charset=utf-8';
    const token = '313e3e42a3273e43577968f8732164c3';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }

  private getAuthAdmin() {
    const conttent = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token});
    return { headers: httpheaders };
  }
}
