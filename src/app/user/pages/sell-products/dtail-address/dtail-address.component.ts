import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dtail-address',
  templateUrl: './dtail-address.component.html',
  styleUrls: ['./dtail-address.component.css']
})
export class DtailAddressComponent implements OnInit {


  selet_url = [];

  url_data: any;
  id_item: any;
  pre_page: any;

  address_dtail: any;


  address: any;
district: any;
phone_receiver: any;
postal_code: any;
province: any;
receiver: any;
sub_district: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.url_data = this.route.snapshot.paramMap.get('id');
    this.selet_url = this.url_data.split('_');
    this.pre_page = parseInt(this.selet_url[0], 10);
    this.id_item = parseInt(this.selet_url[1]  , 10);

    this.get_address();

  }


  get_address() {
    this.productsService.get_productsellByid(this.id_item).subscribe(
      res => {
        console.log('res_address=>', res['body'].order_item[0].delivery_address);
        this.address_dtail = res['body'].order_item[0].delivery_address;

        this.address = this.address_dtail.address;
        this.district = this.address_dtail.district;
        this.phone_receiver = this.address_dtail.phone_receiver;
        this.postal_code = this.address_dtail.postal_code;
        this.province = this.address_dtail.province;
        this.receiver = this.address_dtail.receiver;
        this.sub_district = this.address_dtail.sub_district;

      }, err => {
        console.log('err=>', err);
      }

    );
  }


}
