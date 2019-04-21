import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrls: ['./add-adress.component.css']
})
export class AddAdressComponent implements OnInit {

  address: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.address = this.fb.group({
      receiver: [''],
      address: [''],
      sub_district: [''],
      district: [''],
      province: [''],
      postal_code: [''],
      phone_receiver: ['']
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
         this.router.navigate(['/mado/checkOut/0']);
      }, error => {
        console.log('error' , error);
      }
    );
  }
}
