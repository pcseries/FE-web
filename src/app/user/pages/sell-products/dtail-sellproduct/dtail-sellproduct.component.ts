import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dtail-sellproduct',
  templateUrl: './dtail-sellproduct.component.html',
  styleUrls: ['./dtail-sellproduct.component.css']
})
export class DtailSellproductComponent implements OnInit {

  id_item: any;
  url_data: any;
  selet_url = [];
  item_dtail: any;

  name_product: any;
  quantity: any;
  price: any;
  name_variation: any;
  price_all: any;

  name_ship: any;
  price_ship: any;

  status_pay: any;
  pre_page: any;
  imageToShow: any;

  track_num: any;
  num_order: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.url_data = this.route.snapshot.paramMap.get('id');

    this.selet_url = this.url_data.split('_');
    // console.log('select_url=>', this.selet_url);
    this.pre_page = parseInt(this.selet_url[0], 10);
    this.id_item = parseInt(this.selet_url[1]  , 10);
    if(this.pre_page !== 5) {
      this.num_order = this.selet_url[2];
    } else {
      this.num_order = this.selet_url[3]
    }
    // alert(this.id_item);
     this.get_sellProduct();
  }


  get_sellProduct() {
    this.productsService.get_productsellByid(this.id_item).subscribe(
      res => {
        console.log('data_sellProduct=>', res['body'].order_item[0]);
        this.item_dtail = res['body'].order_item[0];
        this.name_product = this.item_dtail.product.name_product;
        this.quantity = this.item_dtail.quantity;
        this.price = this.item_dtail.price;
        this.name_variation = this.item_dtail.product.name_variation;

        this.price_ship = this.item_dtail.product_delivery.price_ship;
        this.name_ship = this.item_dtail.product_delivery.type;
        this.price_all = (this.price * this.quantity) + this.price_ship;

        const id = this.item_dtail.product.id_product;
        const name_pic = this.item_dtail.product.pic_product;

        this.getImageFromService(id, name_pic);
        console.log('pre_page', this.pre_page);

        if (this.pre_page === 0) {
          this.status_pay = 'ยังไม่ชำระเงิน';
          this.track_num = '-';
        } else {
          this.status_pay = 'โอน/ชำระผ่านช่องทางธนาคาร';
        }


      } , err => {
        console.log('err=>', err);
      }
    );
  }


  getImageFromService(id: any, namePic: any) {
    this.productsService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data);

      },
      error => {

        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;

      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
