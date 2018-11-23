import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-open-store',
  templateUrl: './open-store.component.html',
  styleUrls: ['./open-store.component.css']
})
export class OpenStoreComponent implements OnInit {

  constructor(public dialog: MatDialog , private rounter: Router) { }

  ngOnInit() {
  }

  openDialog(): void {
    if (localStorage.getItem('token') != null) {
      const dialogRef = this.dialog.open(MyDialogComponent , {
      data: {
        store: "Orange",
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

    } else {
      alert('Please Login');
      this.rounter.navigate(['/main-login']);
    }



  }

}
