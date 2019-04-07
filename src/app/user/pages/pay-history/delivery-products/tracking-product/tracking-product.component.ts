import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking-product',
  templateUrl: './tracking-product.component.html',
  styleUrls: ['./tracking-product.component.css']
})
export class TrackingProductComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  on_gopayhistory() {
    this.router.navigate(['/user/payHistory/1']);
  }
}
