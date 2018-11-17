import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@Component({
  selector: 'app-open-store',
  templateUrl: './open-store.component.html',
  styleUrls: ['./open-store.component.css']
})
export class OpenStoreComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent , {
      data: {
        store: "Orange",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
