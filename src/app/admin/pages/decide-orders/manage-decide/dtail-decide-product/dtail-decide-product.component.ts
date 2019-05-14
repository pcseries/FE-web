import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-dtail-decide-product',
  templateUrl: './dtail-decide-product.component.html',
  styleUrls: ['./dtail-decide-product.component.css']
})
export class DtailDecideProductComponent implements OnInit {

  url_data: any;

  selet_url = [];
  id_order_history: any;

  track_num: any;
  data_pd: any;
  descrip: any;
  des_stat: any;
  ordered_date: any;


  // dtail product
  name_shop: any;
  name_product: any;
  quantity: any;
  variation: any;
  each_price: any;
  result_price: any;
  name_ship: any;
  price_ship: any;
  all_price: any;
  imageToShow: any;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {

    this.url_data = this.route.snapshot.paramMap.get('id');
    this.selet_url = this.url_data.split('_');

    this.id_order_history = parseInt(this.selet_url[0], 10);
    this.getOrder_byid(this.id_order_history);
  }

  getOrder_byid(id: any) {
    this.adminService.get_decideProductByid(id).subscribe(
      res => {
        console.log('res=>', res['body']);
        this.data_pd = res['body'][0];
        this.track_num = this.data_pd.tracking_number;
        this.descrip = this.data_pd.description_reject;
        this.ordered_date = this.data_pd.ordered_date;

        this.name_shop = this.data_pd.name_shop;
        this.name_product = this.data_pd.name_product;
        this.quantity = this.data_pd.quantity;
        this.variation = this.data_pd.name_variation;
        this.each_price = this.data_pd.price;
        this.result_price = this.each_price * this.quantity;
        this.name_ship = this.data_pd.type_shipping;
        this.price_ship = this.data_pd.shipping_price;
        this.all_price = this.result_price + this.price_ship;

        const id = this.data_pd.id_product;
        const name_pic = this.data_pd.pic_product;
        this.getImageFromService(id, name_pic);

      }, err => {
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
