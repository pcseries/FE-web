import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/services/core/store.service';

@Component({
  selector: 'app-open-store',
  templateUrl: './open-store.component.html',
  styleUrls: ['./open-store.component.css'],
  providers: [StoreService]
})
export class OpenStoreComponent implements OnInit {

  openShop: FormGroup;
  onClose: any;

  name_shop: any;
  shop_address: any;
  bank_account_name: any;
  bank_account_number: any;
  id_bank_company: any;
  statusDialog: any;

  constructor(public dialog: MatDialog , private rounter: Router,
    private fb: FormBuilder, private storeService: StoreService) {
    this.openShop = this.fb.group({
      name_shop: [''],
      shop_address: [''],
      bank_account_name: [''],
      bank_account_number: [''],
      id_bank_company: [1]
    });
   }

  ngOnInit() {

  }

  openDialog(): void {
    if (localStorage.getItem('token') != null) {
      const dialogRef = this.dialog.open(MyDialogComponent , {
      width: '50%',
      height: '88%',
      data: {
        name_shop: this.openShop.value.name_shop,
        shop_address: this.openShop.value.shop_address,
        bank_account_name: this.openShop.value.bank_account_name,
        bank_account_number: this.openShop.value.bank_account_number,
        statusDialog: this.statusDialog
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //console.log('statusDialog', result.statusDialog);

      if (result.statusDialog !== false) {
        // this.openShop.value.name_shop = result.name_shop;
        // this.openShop.value.shop_address = result.shop_address;
        // this.openShop.value.bank_account_name = result.bank_account_name;
        // this.openShop.value.bank_account_number = result.bank_account_number;
        //console.log(this.openShop.value);
        this.open(result);
      }
    });

    } else {
      alert('Please Login');
      this.rounter.navigate(['/mado/login']);
    }


  }
    open (data: FormGroup) {
      console.log(data);
      //location.reload();
      this.storeService.openStore(data).subscribe(
        res => {
          //console.log('store', res);
          location.reload();
        },
        error => {
          console.log('err', error);
        }
      );


    }

    whenClose() {

    }

}
