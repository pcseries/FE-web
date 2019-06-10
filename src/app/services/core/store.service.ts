import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

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
    return this.http.post('http://158.108.207.7:8080/ecom/api/eshop/' + 'upload/' , formData , this.getAuthImage());
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


  get_package(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'recpackage', this.getAuth_Catagory());
  }

  add_productPackage(data: any): Observable<any> {
    return this.http.post(this.baseUrlBS + 'addrecproduct', data , this.getAuth());
  }

  pay_package(data: any): Observable<Blob> {
    return this.http.post(this.baseUrlBS + 'recproductpaid', data, {responseType: 'blob', headers: this.getAuth_Image()});
  }

  get_stastusPaid(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'recproductid/' + id, this.getAuth_web());
  }

  get_dtailPackageproduct(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'recproductid/' + id, this.getAuth_web());
  }

  close_store(): Observable<any> {
    return this.http.delete(this.baseUrlBS + 'shops', this.getAuth());
  }

  openStore_again(): Observable<any> {
    return this.http.put(this.baseUrlBS + 'shops/open', null , this.getAuth());
  }

  set_rate(data: any): Observable<any> {
    return this.http.post(this.baseUrlC + 'rating/shop/', data, this.getAuth());
  }


  get_rate(id: any): Observable<any> {
    return this.http.get(this.baseUrlC + 'rating/shop/' + id , this.getAuth());
  }

  get_comments(id_shop: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'shopcomment/' + id_shop , this.getAuth_web());
  }

  getShop() {
    return this.http.get(this.baseUrlBS + 'shops' , this.getAuth_web());
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

  private getAuth_Image() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'token': token});
    return  httpheaders ;
  }


  getAuthDelete() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': 'application/json' , 'token': token});
    return  httpheaders;
  }




}
