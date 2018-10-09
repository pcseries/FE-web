import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


export interface DialogData {
  name: string;
  pass: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  pass: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {  }

  openDialog() {
    const dialogRef = this.dialog.open(loginDialog, {
      width: '300px',
      height: '380px',
      data: {name: this.name, pass: this.pass}
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}


@Component ({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html'
})
export class loginDialog implements OnInit{

  userLogin: FormGroup;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<loginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) {
      this.userLogin = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    ngOnInit() {
      this.loading = false;
     }

    onLogin() {
      this.loading = true;

    }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
}
