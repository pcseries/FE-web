import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { parse } from 'path';


@Component({
  selector: 'app-useredit-address',
  templateUrl: './useredit-address.component.html',
  styleUrls: ['./useredit-address.component.css']
})
export class UsereditAddressComponent implements OnInit {

  address: FormGroup;
  data_address: any;

  id_address: any;

  // ข้อมูล address
  receiver: any;
  address1: any;
  sub_district: any;
  district: any;
  province: any;
  postal_code: any;
  phone_receiver: any;

  statusforBuy: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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
    console.log(this.router.url);



    this.id_address = this.route.snapshot.paramMap.get('id');

    if (this.router.url === ('/mado/manageAddress/editAddress/' + this.id_address)) {
      this.statusforBuy = true;
      // alert('sucess');
    } else {
      this.statusforBuy = false;
    }

    // alert(this.id_address);
    this.on_getAddress();
  }

  on_getAddress() {
    this.userService.get_addressbyId(this.id_address).subscribe(
      res => {
        console.log('get_address=>', res['body']);
        this.data_address = res['body'][0];
        console.log('data_address=>', this.data_address);
        this.receiver = this.data_address.receiver;
        this.address1 = this.data_address.address;
        this.sub_district = this.data_address.sub_district;
        this.district = this.data_address.district;
        this.province = this.data_address.province;
        this.postal_code = this.data_address.postal_code;
        this.phone_receiver = this.data_address.phone_receiver;
         this.on_setaddress();
      }, error => {
        console.log('err_getaddress=>', error);
      }
    );
  }

  on_setaddress() {
    this.address = this.fb.group({
      id_address: this.id_address,
      receiver: [this.receiver ],
      address: [this.address1],
      sub_district: [this.sub_district],
      district: [this.district],
      province: [this.province],
      postal_code: [this.postal_code],
      phone_receiver: [ this.phone_receiver]
    });
    console.log('address_value=>', this.address.value);
  }

  on_editAddress() {
    console.log('data_address=> ', this.address.value);

    this.userService.update_address(this.address.value).subscribe(
      res => {
        console.log('update_address=>', res);
        alert('แก้ไขสถานที่รับสินค้า สำเร็จ');
        this.ngOnInit();
      }, error => {
        console.log('err_update', error);
      }
    );
  }

  go_manageAddress() {
    this.router.navigate(['/mado/manageAddress']);
  }

}
