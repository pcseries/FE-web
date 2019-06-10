import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {


  baseUrlBS: string = environment.apiUrlBS;

  constructor(private http: HttpClient) { }

  private getAuthAdmin() {
    const content = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }


  getBusinessRule(): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/business_rule', this.getAuthAdmin());
  }

  getIncome(): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/incomes', this.getAuthAdmin());
  }

  getIncomeByID(incomeID): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/incomes/'+incomeID, this.getAuthAdmin());
  }

  getIncomeReportByID(incomeID): Observable<Blob> {
    /*
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    */
    const content = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/incomes/pdf/'+incomeID, { headers: httpheaders, responseType: 'blob' });
  }

  getShopIncomeReportByID(incomeID, transferID): Observable<Blob> {
    const content = 'application/json; charset=utf-8';
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': content , 'token': token});
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/incomes/pdf/'+incomeID+"/"+transferID, { headers: httpheaders, responseType: 'blob' });
  }

  getUserBalance(): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/user_balances', this.getAuthAdmin());
  }

  getUserBalanceByType(userBalanceType): Observable<any> {
    return this.http.get('http://158.108.207.7:8181/ecom/api/emarket/user_balances?type='+userBalanceType, this.getAuthAdmin());
  }

  setBusinessRule(businessID: any) {
    return this.http.put('http://158.108.207.7:8181/ecom/api/emarket/business_rule/set/'+businessID, null, this.getAuthAdmin());
  }

  setTransfer(transferID, transferDatetimeData) {
    return this.http.put('http://158.108.207.7:8181/ecom/api/emarket/incomes/transfer/'+transferID, transferDatetimeData, this.getAuthAdmin());
  }

  setRefund(userBalanceID, transferDatetimeData) {
    return this.http.put('http://158.108.207.7:8181/ecom/api/emarket/user_balance/refund/transfers/'+userBalanceID, transferDatetimeData, this.getAuthAdmin());
  }


}
