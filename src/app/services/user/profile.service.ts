import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Member } from 'src/app/models/member';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  baseUrlBS: string = environment.apiUrlBS;
  sendFile: FormGroup;

  editProfile(member: Member): Observable<any> {
    console.log('mem' , member);
    return this.http.put(this.baseUrlBS + 'users', member, this.getAuthProfile());
  }

   upLoadProfile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('id_product', '10');

    // this.sendFile = new FormGroup({
    //   file: new FormControl(fileToUpload),
    //   id_product: new FormControl('10')
    // });
    //this.sendFile.patchValue({image: fileToUpload});
   // let Form = JSON.stringify(this.sendFile.value);
    console.log('file', formData);
     return this.http
      .post( 'http://158.108.207.7:8080/ecom/api/eshop/upload/', formData , this.getAuthImage());
   }

  private getAuthProfile() {
    const token = localStorage.getItem('token');
    const conttent = 'application/json';
    const name = 'multipart/form-data';
    const httpheaders = new HttpHeaders({'Content-Type': conttent , 'token': token, 'enctype': name});
    return { headers: httpheaders };
  }

  private getAuthImage() {
    const token = '1a2b3c';
    const content = 'application/x-www-form-urlencoded';
    const name = 'multipart/form-data';
    const httpheaders = new HttpHeaders({ 'Content-Type': content , 'token': token , 'enctype': name});
    return { headers: httpheaders };
  }


}
