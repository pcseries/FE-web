import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-dtail-pay-history',
  templateUrl: './dtail-pay-history.component.html',
  styleUrls: ['./dtail-pay-history.component.css']
})
export class DtailPayHistoryComponent implements OnInit {

  send_text: any;
  status_num = [];
  backpage: any;
  id_item: any;
  id_order: any;
  order_item: any;
  dtail_item: any;

  // dtail อื่นๆ
  shop_name: any;
  name_product: any;
  quantity: any;
  price: any;
  price_delivery: any;
  final_price: any;


  loading: any;
  imageToShow: any;
  name_ship: any;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.send_text = this.route.snapshot.paramMap.get('id');

    // alert(this.send_text);
    this.status_num = this.send_text.split("_");
    // console.log('text_status=>', this.status_num);

    this.backpage =  parseInt(this.status_num[0] , 10);

    this.id_order = parseInt(this.status_num[1] , 10);
    this.id_item = parseInt(this.status_num[2] , 10);
    this.get_order(this.status_num);
  }

  get_order(id: any) {
    // alert(id);
   // console.log('item', this.status_num);
    this.productsService.ongetorder_byid(this.id_order).subscribe(
      res => {
        console.log('get_orderid=>', res['body'].order[0]);
        this.order_item = res['body'].order[0].order_item;

        for (let i = 0 ; i < this.order_item.length; i++) {

          if (this.id_item === this.order_item[i].id_item) {
            console.log('item=>', this.order_item[i]);
            this.dtail_item = this.order_item[i];
            this.shop_name = this.dtail_item.shop_name;
            this.name_product = this.dtail_item.name_product;
            this.quantity = this.dtail_item.quantity;
            this.price = this.dtail_item.price;
            this.price_delivery = this.dtail_item.product_delivery.price;

            console.log('name_ship=>', this.dtail_item.product_delivery.name_ship);
            this.name_ship =this.dtail_item.product_delivery.name_ship;
            this.final_price = (this.price * this.quantity) + this.price_delivery;
            // console.log('price_delivery=>', this.price_delivery);
            const id  =  this.dtail_item.id_product;
            const name_pic = this.dtail_item.pic_product;
            this.getImageFromService(id, name_pic);

          }
        }
      }, err => {
        console.log('err_id=>', err);
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
        this.loading = true;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  go_backpage() {
    this.router.navigate(['user/payHistory/', this.backpage]);
  }

}
