import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-useradd-address',
  templateUrl: './useradd-address.component.html',
  styleUrls: ['./useradd-address.component.css']
})
export class UseraddAddressComponent implements OnInit {

  address: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.address = this.fb.group({
      receiver: ['', Validators.required],
      address: ['', Validators.required],
      sub_district: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      postal_code: ['', Validators.required],
      phone_receiver: ['', Validators.required]
    });
   }


  ngOnInit() {
  }

  onAdd_address() {
    console.log('data-address=>', this.address.value);
    this.userService.create_address(this.address.value).subscribe(
      res => {
        alert('บันทึกสำเร็จ');
        console.log('resAddress=> ', res);
         this.router.navigate(['/user/addressManage']);
      }, error => {
        console.log('error' , error);
      }
    );
  }

}
