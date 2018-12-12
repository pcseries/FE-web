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

}

