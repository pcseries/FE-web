import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addcategory-dialog',
  templateUrl: './addcategory-dialog.component.html',
  styleUrls: ['./addcategory-dialog.component.css']
})
export class AddcategoryDialogComponent implements OnInit {

  data_send: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddcategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }




  on_save(txt: HTMLInputElement) {
    this.data_send = this.fb.group({
      status: true,
      data: txt.value
    });

    this.dialogRef.close(this.data_send.value);

    // save dialog
  }


  on_Cancel() {
    this.data_send = this.fb.group({
      status: false
    });

    this.dialogRef.close(this.data_send.value);
  }


}
