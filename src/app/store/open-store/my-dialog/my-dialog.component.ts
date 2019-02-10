import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';

import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { parse } from 'url';
import { StoreService } from 'src/app/services/core/store.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
  providers: [StoreService]
})
export class MyDialogComponent implements OnInit {

  openStore: FormGroup;
  matcher = new MyErrorStateMatcher();
  name_bank: any;

  selected: any;
  banks: any;

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
  private fb: FormBuilder,
    private storeService: StoreService) {
      this.openStore = this.fb.group({
        name_shop: ['', Validators.required],
        bank_account_name: ['', Validators.required],
        bank_account_number: ['', [Validators.required, Validators.minLength(10),  Validators.maxLength(10), Validators.pattern('[0-9]+[A-Z]?')]],
        shop_address: ['', Validators.required],
        id_bank_company: ['', Validators.required],
        statusDialog: [false]
      }
      );

    }

  ngOnInit() {
    this.setBank();
  }

  setBank() {
    this.storeService.getBank().subscribe(
      res => {
        this.selected = '1'; // res['body'][0].id_bank_company.toString();
        this.name_bank = res['body'][0].bank_name;
        this.banks = res['body'];
        console.log('getBank', res['body']);
        console.log('selected', this.selected);

      },
      err => {
        console.log('bankError', err);
      }
    );
  }

  save() {
    // this.dialogRef.close("It WAS SAVED");
    // this.data['statusDialog'] = false;
    this.openStore.value.statusDialog = true;
    // this.openStore.value.id_bank_company = parseInt(this.selected, 10);
    // console.log('save');

    // console.log('openStore', this.openStore.value);
    this.openStore.value.id_bank_company = this.openStore.value.id_bank_company.toString();
   // console.log(typeof(this.openStore.value.id_bank_company));

     this.dialogRef.close(this.openStore.value);

    // save data
  }

 close() {
   //console.log(parseInt(this.selected, 10));
  //this.data['statusDialog'] = false;
   //console.log('data', this.data['statusDialog']);
   this.openStore.value.statusDialog = false;
   //this.openStore.value.id_bank_company = parseInt(this.selected, 10);
  // console.log('bank',  this.openStore.value.id_bank_company);

   this.dialogRef.close(this.openStore.value);
 }



}
