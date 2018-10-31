import { Injectable } from '@angular/core';
import { STUDENTS } from './../components/mock.data';

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  students = STUDENTS["0"]["body"];
  constructor() { }

  getData() {
    return this.students;
  }
}
