import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrls: ['./add-adress.component.css']
})
export class AddAdressComponent implements OnInit {

  address: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.address = this.fb.group({
      receiver: [''],
      address: [''],
      sub_district: [''],
      district: [''],
      province: [''],
      phone_receiver: ['']
    });
   }

  ngOnInit() {
  }

}
