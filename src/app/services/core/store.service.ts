import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  baseUrlC: string = environment.apiUrlC;
  baseUrlBS: string = environment.apiUrlBS;

  openStore(shop: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'shops', shop, this.getAuth());
  }

  storeCheck() {
    return this.http.get(this.baseUrlBS + 'checkshop', this.getAuth());
  }

  getBank() {
    return this.http.get(this.baseUrlBS + 'banks', this.getAuth());
  }

  addProduct(product: any) {
    return this.http.post(this.baseUrlC + 'product/', product, this.getAuth());
  }

  getProduct_store() {
    return this.http.get(this.baseUrlC + 'product/', this.getAuth());
  }

  getCatagory() {
    return this.http.get(this.baseUrlBS + 'catagories', this.getAuth_Catagory());
  }

  getAuth() {
    const token = localStorage.getItem('token');
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }

  getAuth_Catagory() {
    const token = 'PC9OqYjEQ10c5W78T3ADxwPFe6BTDgTx';
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }

}
