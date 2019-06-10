import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { config } from 'rxjs';

@Component({
  selector: 'app-address-manage',
  templateUrl: './address-manage.component.html',
  styleUrls: ['./address-manage.component.css']
})
export class AddressManageComponent implements OnInit {

  data_address: any;

  is_default: any;
  allow_delete: any;

  statusforBuy: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url === '/mado/manageAddress') {
     // alert('success');
      this.statusforBuy = true;
    } else {
      this.statusforBuy = false;
    }
    this.allow_delete = false;
    this.get_address();
  }

  get_address() {



    this.userService.get_address().subscribe(
      res => {
        console.log('address_data=>', res['body']);
        this.data_address = res['body'];
        if (this.data_address.length > 1) {

          this.allow_delete = true;

        }
        for (let i = 0; i < this.data_address.length; i++) {
          if (this.data_address[i].status === 'DEFAULT' ){
            this.is_default = i;
            console.log('Default is =>', this.is_default);
          }
        }
      }, error => {
        console.log('err_address=>', error);
      }
    );
  }

  on_goAddaddress() {

// if else
    if (this.statusforBuy) {
      this.router.navigate(['/mado/manageAddress/add']);
    } else {
      this.router.navigate(['/user/addressManage/addAddress']);
    }

  }

  on_deleteAddress(ind: any) {
  // alert(this.data_address[ind].id_address);

  let c = confirm('คุณต้องการลบที่รับสินค้า หรือไม่');

  if (c) {
      this.userService.delete_address(this.data_address[ind].id_address).subscribe(
    res => {
      console.log('delete_address=>', res);
      this.ngOnInit();
    }, error => {
      console.log('error_address=>', error);
    }
   );
  }
  }

  on_editAddress(ind: any) {
//if else

    // alert(this.data_address[ind].id_address);
    if (this.statusforBuy) {
      this.router.navigate(['/mado/manageAddress/editAddress/', this.data_address[ind].id_address]);
    } else {
      this.router.navigate(['/user/addressManage/editAddress', this.data_address[ind].id_address]);
    }

  }


  address_setdefault(ind: any) {
    // alert(this.data_address[ind].id_address);
   // console.log('id_address=>', this.data_address[ind].id_address);
    this.userService.setaddress_default(this.data_address[ind].id_address).subscribe(
      res => {
        console.log('set_default=>', res);
        this.ngOnInit();
      }, error => {
        console.log('set_default=>', error);
      }
    );
  }

  go_sellProducts() {
    this.router.navigate(['/mado/checkOut']);
  }

}
