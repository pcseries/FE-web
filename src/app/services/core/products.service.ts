import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { retry } from 'rxjs/operators';

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
    return this.http.get('http://158.108.207.7:8080/ecom/api/eshop/' + 'download' , { responseType: 'blob' , params
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

  update_reject(data: any) {
    return this.http.put(this.baseUrlC + 'orderitemseller', data , this.getAuth());
  }

  get_orderHistory() {
    return this.http.get(this.baseUrlC + 'orderhistory', this.getAuth());
  }

  set_Scoreforproduct(data: any) {
    return this.http.post(this.baseUrlC + 'rating/product', data, this.getAuth());
  }

  get_ratingProduct(id: any) {
    return this.http.get(this.baseUrlC + 'rating/product/' + id , this.getAuth());
  }

  get_comments(id: any){
    return this.http.get(this.baseUrlBS + 'productcomment/' + id, this.authWeb());
  }

  searchProductbyProduct(product: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'products?name_product=' + product, this.authWeb());
  }

  get_productsSubcate(id: any): Observable<any> {
    return this.http.get(this.baseUrlBS + 'products?id_catagory=' + id, this.authWeb());
  }


  get_promotion(id: any): Observable<any> {
    return this.http.get(this.baseUrlC + 'promotion/' + id , this.getAuth());
  }

  edit_promo(data: any): Observable<any> {
    return this.http.put(this.baseUrlC + 'promotion', data , this.getAuth());
  }

  delete_promo(id: any): Observable<any> {
    return this.http.delete(this.baseUrlC + 'promotion/' + id, this.getAuth());
  }

  addProduct_promotion(data: any): Observable<any> {
    return this.http.post(this.baseUrlC + 'promotion', data, this.getAuth());
  }

  get_BSformonth(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productpopmonth/10', this.authWeb());
  }

  get_BSforday(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productpopday/10', this.authWeb());
  }


  get_BSforweek(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productpopweek/10', this.authWeb());
  }

  get_reccomProducts(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'recproduct/10', this.authWeb());
  }

  get_allreccomProducts(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'recproduct/100', this.authWeb());
  }

  get_allPromoProduct(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'productpromo/100', this.authWeb());
  }

  get_allProducts(): Observable<any> {
    return this.http.get(this.baseUrlBS + 'products', this.authWeb());
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

