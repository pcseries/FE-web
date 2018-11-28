import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/core/store.service';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css'],
  providers: [StoreService]
})
export class SubnavComponent implements OnInit {

  isOpen: any = false;
  status: any;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.storeCheck().subscribe(
      res => {
        this.status = res['status'];
        if (this.status === 401) {
          console.log('statusStore', this.status);
        } else {
          this.isOpen = true;
        }
      },
      err => {
        console.log('errStatus', err);
      }
    );

  }

  checkStore() {

  }

  onSubmit() {
    alert('SUCCESS!! ');
  }

}
