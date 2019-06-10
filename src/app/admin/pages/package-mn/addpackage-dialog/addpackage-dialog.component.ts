import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addpackage-dialog',
  templateUrl: './addpackage-dialog.component.html',
  styleUrls: ['./addpackage-dialog.component.css']
})
export class AddpackageDialogComponent implements OnInit {

  data_send: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddpackageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  on_save(name: HTMLInputElement , price: HTMLInputElement, day: HTMLInputElement) {
    this.data_send = this.fb.group({
      status: true,
      name: name.value,
      price: price.value,
      day: day.value
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
