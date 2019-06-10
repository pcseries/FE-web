import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-bestseller',
  templateUrl: './product-bestseller.component.html',
  styleUrls: ['./product-bestseller.component.css']
})
export class ProductBestsellerComponent implements OnInit {

  id_type: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id_type = this.route.snapshot.paramMap.get('id');
  }

  best_day() {
    if (this.id_type !== '0') {
      this.router.navigate(['mado/searchbestseller/0']);

    }

  }

  best_week() {
    if (this.id_type !== '1') {
      this.router.navigate(['mado/searchbestseller/1']);

    }

  }

  best_month() {
    if (this.id_type !== '2') {
      this.router.navigate(['mado/searchbestseller/2']);

    }

  }

}
