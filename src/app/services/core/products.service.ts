import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  baseUrlC: string = environment.apiUrlC;
  baseUrlBS: string = environment.apiUrlBS;
  params = new HttpParams();


  getsProducts(): Observable<any> {
    return this.http.get(this.baseUrlC + '/product/' , this.getAutprodtuct());
  }

  getImage(id: any, name: any): Observable<Blob> {
    let params1 = new HttpParams().set("id_product", id).set("filename", name);
    return this.http.get(this.baseUrlC + 'download' , { responseType: 'blob' , params
    : params1 , headers:  this.Image()});
  }

  detailProduct(idProduct: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productid/' + idProduct  , this.getCardProduct());
  }

  getnewProduct(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productnew/5', this.authWeb());
  }

  getPromoProduct(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productpromo/5', this.authWeb());
  }

  ordered_product(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'order/', data , this.getAuth());
  }

  update_order(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'order/', data , this.getAuth());
  }

  pay_product(data: any): Observable<Blob> {
    return this.http.post(this.baseUrlBS + 'promptpay', data, {responseType: 'blob', headers: this.getAuthImage()});
  }


  get_paying(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'type/payments', this.getAuth());
  }

  update_ordered(ordered: any): Observable<any> {
    return this.http.put('http://158.108.207.7:8080/ecom/api/eshop/order/', ordered , this.getAuth());
  }

  get_order(): Observable<any> {
    return this.http.get(this.baseUrlC  + 'order/', this.getAuth());
  }

  ongetorder_byid(id: any): Observable<any> {
    return this.http.get(this.baseUrlC + 'order/' + id, this.getAuth());
  }

  update_complete(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'orderitem/', data , this.getAuth());
  }

  onreject_product(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'orderitem/', data, this.getAuth());
  }

  on_setShipping(data: any): Observable<any> {
    return this.http.post(this.baseUrlC + 'product/delivery', data, this.getAuth());
  }

  get_productsellByid(id: any) {
    return this.http.get(this.baseUrlC + 'orderforseller/' + id, this.getAuth());
  }


  create_track(data: any) {
    return this.http.put(this.baseUrlC + 'orderforseller/', data, this.getAuth());
  }

  private getAutprodtuct() {
    const token = '1a2b3c';
    const httpheaders = new HttpHeaders({'token': token});
    return { headers: httpheaders };
  }

  private Image() {
    const token = '1a2b3c';
    const httpheaders = new HttpHeaders({'token': token});
    return  httpheaders ;
  }

  private authWeb() {
    const token = 'PC9OqYjEQ10c5W78T3ADxwPFe6BTDgTx';
    const httpheaders = new HttpHeaders({'token': token});
    return { headers: httpheaders};
  }

  private getCardProduct() {
    const token = 'PC9OqYjEQ10c5W78T3ADxwPFe6BTDgTx';
    const httpheaders = new HttpHeaders({'token': token});
    return { headers: httpheaders };
  }

  getAuth() {
    const token = localStorage.getItem('token');
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }

  private getAuthImage() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'token': token});
    return  httpheaders ;
  }

}

