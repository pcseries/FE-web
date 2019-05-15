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

  getproductbyID(idProduct: any): Observable<any> {
    return this.http.get(this.baseUrlC + 'product/' + idProduct , this.getAuth());
  }

  // edit Product
  editofProduct(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'product/' , data , this.getAuth());
  }

  deleteVariation(data: any): Observable<any> {
    return this.http.request('delete', this.baseUrlC + 'product/', {body: data, headers: this.getAuthDelete()});
  }

  deleteProduct(data: any): Observable<any> {
    return this.http.request('delete', this.baseUrlC + 'product/' + data, { headers: this.getAuthDelete()});
  }

  upImageProduct(fileToUpload: File, idProduct: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('id_product', idProduct);
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log('formdata', formData);
    return this.http.post(this.baseUrlC + 'upload/' , formData , this.getAuthImage());
  }

  get_shipping(id: any) {
    return this.http.get(this.baseUrlC + 'product/delivery/' + id, this.getAuth());
  }

  getDetail_shop() {
    return this.http.get(this.baseUrlBS + 'shops/user', this.getAuth());
  }

  edit_store(data: any) {
    return this.http.put(this.baseUrlBS + 'shops', data, this.getAuth());
  }

  get_dtailbyid(id: any) {
    return this.http.get(this.baseUrlBS + 'shopsbyid/' + id, this.getAuth_web());
  }

  get_productsOfshop(id: any) {
    return this.http.get(this.baseUrlBS + 'products/byshop/' + id, this.getAuth_web());
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


  getAuth_web() {
    const token = 'PC9OqYjEQ10c5W78T3ADxwPFe6BTDgTx';
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }


  private getAuthImage() {
    const token = localStorage.getItem('token');
    const name = 'multipart/form-data';
    const httpheaders = new HttpHeaders({ 'token': token, 'mimeType': name});
    return { headers: httpheaders };
  }


  getAuthDelete() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': 'application/json' , 'token': token});
    return  httpheaders;
  }

}
