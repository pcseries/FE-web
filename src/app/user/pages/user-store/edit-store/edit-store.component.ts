import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/services/core/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  data_store: FormGroup;
  name_store: any;
  address_store: any;
  nameBank_store: any;
  numBank_store: any;

  store: any;


  constructor(
    private storeService: StoreService,
    private fb: FormBuilder,
    private router: Router
  ) {
      this.data_store = this.fb.group({
        name_shop: [this.name_store ],
        bank_account_name: [this.nameBank_store],
        bank_account_number: [this.numBank_store],
        shop_address: [this.address_store ]
      });
   }

  ngOnInit() {
    this.get_detail();

  }

  get_detail() {
    this.storeService.getDetail_shop().subscribe(
      res => {
        console.log('res_store=>', res['body'][0]);
        this.store = res['body'][0];
        this.name_store = this.store.name_shop;
        this.address_store = this.store.shop_address;
        this.nameBank_store = this.store.bank_account_name;
        this.numBank_store = this.store.bank_account_number;
        this.infoForm();
      }, error => {
        console.log('err', error);
      }
    );
  }

  onEdit_address() {
    console.log(this.data_store.value);

    this.storeService.edit_store(this.data_store.value).subscribe(
      res => {
        alert('อัพเดทที่อยู่สำเร็จ');
        this.ngOnInit();
        console.log('res_editStore=>', res);
      }, error => {
        console.log('err_edit=>', error);
      }
    );
  }

  infoForm() {
    this.data_store = this.fb.group({
      name_shop: [this.name_store ],
      bank_account_name: [this.nameBank_store],
      bank_account_number: [this.numBank_store],
      shop_address: [this.address_store ]
    });


  }

  close_store() {
    if(confirm('คุณต้องการปิดร้าน จริงหรือ')) {
      this.storeService.close_store().subscribe(
        res => {
          console.log('res', res);
          this.router.navigate(['/user/store']);
        }, err => {
          console.log('err', err);
        }
      );
    }

  }

}
