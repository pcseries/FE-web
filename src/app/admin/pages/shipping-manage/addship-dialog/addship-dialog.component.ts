import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addship-dialog',
  templateUrl: './addship-dialog.component.html',
  styleUrls: ['./addship-dialog.component.css']
})
export class AddshipDialogComponent implements OnInit {

  data_send: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<AddshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

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
