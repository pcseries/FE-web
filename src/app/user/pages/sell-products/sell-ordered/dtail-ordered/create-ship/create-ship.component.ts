import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-create-ship',
  templateUrl: './create-ship.component.html',
  styleUrls: ['./create-ship.component.css']
})
export class CreateShipComponent implements OnInit {

  track_data: FormGroup;
  url_data: any;

  id_item: any;
  selet_url = [];

  track_number: any;
  complete_stat: any;
  from_page: any;

  id_order: any;
  track_enable: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.url_data = this.route.snapshot.paramMap.get('id');
    this.selet_url = this.url_data.split('_');

    this.id_item = parseInt(this.selet_url[1]  , 10);
    this.id_order = parseInt(this.selet_url[2], 10);
    this.from_page = parseInt(this.selet_url[0], 10);
    console.log('frompage=>', this.from_page);
    if (this.from_page === 3 || this.from_page === 5 || this.from_page === 4) {

      this.complete_stat = true;
     // alert(this.complete_stat);
    } else {
      this.complete_stat = false;
    }


    if (this.from_page === 2 || this.from_page === 3 ) {

      this.track_enable = true;
     // alert(this.complete_stat);
    } else {
      this.track_enable = false;
    }


    this.get_datatrack();
  }

  get_datatrack() {
    this.productsService.get_productsellByid(this.id_item).subscribe(
      res => {

        this.track_number = res['body'].order_item[0].tracking_number;
        console.log('get_track=>', res['body'].order_item[0]);



      }, err => {
        console.log('err_track=>', err);
      }
    );

  }


  add_tracknum(input_track: HTMLInputElement) {
    // alert(input_track.value);

    this.track_data = this.fb.group({
      body: {
        id_item : this.id_item,
		    tracking_number: input_track.value
      }
    });

    console.log('data_track=>', this.track_data.value);

    this.productsService.create_track(this.track_data.value).subscribe(
      res => {

        console.log('track=>', res);
        alert(res['msg']);
      }, err => {
        console.log('err_track=>', err);
      }
    );

  }

  on_trackData() {
    // alert('track');
    const page = 'seller' + '_' + this.id_item + '_' + this.from_page;
    localStorage.setItem('prepage', this.url_data);
    this.router.navigate(['/user/payHistory/tracking/', page]);
  }
}
