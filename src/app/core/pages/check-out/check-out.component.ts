import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { P } from '@angular/core/src/render3';
import { ShopcartService } from 'src/app/services/core/shopcart.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { MatDialog } from '@angular/material';
import { MyShippingComponent } from './my-shipping/my-shipping.component';
import { StoreService } from 'src/app/services/core/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MyPayingComponent } from './my-paying/my-paying.component';
import { ConstantPool } from '@angular/compiler';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  // ข้อมูลที่จัดส่งต่างๆ
  receiver: any;
  address: any;
  phone_receiver: any;
  postal_code: any;
  province: any;
  district: any;
  sub_district: any;
  res_data: any;

  shopCart: any;
  id_order: any;
  imageToShow = [];
  selectProduct = [];
  pre_select: any;
  order_item: any;

  ship_ping = [];
  time_ship = [];
  price_ship = [];
  price_all = [];

  store_price = [];

  final_price: any;
  final_ship: any;
  price_all_product: any;
  result_radio: any;
  id_item = [];


  id_product: any;



  // ส่วนของ order
  order_all: any;
  order_id = [];
  address_select: any;
  data_order: FormGroup;
  data_delivery: any;
  paying_order: any;
  name_paying: any;

  data_ordered: FormGroup;

  ind_present: any;

  update_first = [];
  count_update: any;
  access_update: any;

  orderitem_update: FormGroup;
  keep_orderitem = [];


  constructor(private userService: UserService,
    private shopcartService: ShopcartService,
    private productService: ProductsService,
    public dialog: MatDialog,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) { }


  ngOnInit() {
    this.access_update = 0;
    this.count_update = 0;
    this.id_product = this.route.snapshot.paramMap.get('id');
    this.order_all = localStorage.getItem('order_all');
    // alert(this.order_all);
    this.onGet_paying();
    for (let i = 0; i < this.order_all; i++) {
      this.order_id[i] = localStorage.getItem('order_' + i.toString());

    }
    this.final_price = 0;
    this.final_ship = 0;
    this.price_all_product = 0;
    this.userService.get_address().subscribe(
      res => {
        // console.log('res=>', res['body'][0]);
        this.res_data = res['body'][0];
        this.receiver = this.res_data.receiver;
        this.phone_receiver = this.res_data.phone_receiver;
        this.address = this.res_data.address;
        this.sub_district = this.res_data.sub_district;
        this.district = this.res_data.district;
        this.province = this.res_data.province;
        this.postal_code = this.res_data.postal_code;
      }, error => {
        console.log('error', error);
      }
    );

    this.shopcartService.getOrder().subscribe(
      res => {
      //  console.log('res_order=>', res['body']['order']);
        this.shopCart = res['body']['order'];


        for (let i = 0; i < this.shopCart.length; i++) {
          if (this.shopCart[i].order_status === 'ORDERING') {
            this.id_order = this.shopCart[i].id_order;
            this.order_item = this.shopCart[i].order_item;
            for (let j = 0; j < this.shopCart[i]['order_item'].length; j++) {

              console.log('order_item=>', this.shopCart[i]['order_item']);

              for (let k = 0 ; k < this.shopCart[i]['order_item'].length ; k++) {


                if (this.order_id[j] == this.shopCart[i]["order_item"][k].id_variation) {
                  // alert(this.order_id[j]);

                  // console.log('order-Product=>', this.shopCart[i]["order_item"][k]);
                  this.id_item.push(this.shopCart[i]["order_item"][k].id_item);
                  this.selectProduct.push(this.shopCart[i]["order_item"][k]);
                  let id = this.shopCart[i]["order_item"][k].id_product;
                  let namepic = this.shopCart[i]["order_item"][k].pic_product;

                 // console.log('selectProduct=>', this.selectProduct);
              this.store_price.push(this.selectProduct[j].price * this.selectProduct[j].quantity);

              this.storeService.get_shipping(id).subscribe(
                res_ship => {
                //  console.log('res_shipping=>', res_ship['body']['product_delivery']);
                  this.data_delivery = res_ship['body']['product_delivery'];
                  this.onSet_other(this.shopCart[i]["order_item"][k]);
                  this.ship_ping.push(res_ship['body']['product_delivery'][0].name_ship);
                //  console.log('name_ship=>', this.ship_ping[0]);
                  this.time_ship.push(res_ship['body']['product_delivery'][0].time_ship);
                  this.price_ship.push(res_ship['body']['product_delivery'][0].price);

                  this.price_all.push(this.price_ship[j] + this.store_price[j]);
                  this.final_price = this.final_price + this.price_all[j];
                  this.final_ship = this.final_ship + this.price_ship[j];
                  this.price_all_product = this.final_price - this.final_ship;
                //  console.log('each_price', this.price_all[j]);


                }, error => {
                  console.log('err_ship=>', error);
                }
              );

              this.getImageFromService(id, namepic , j);

                }
              }

              }
            }
          }

          setTimeout(() => {
            // console.log('data_update=>', this.data_order.value);
            this.on_firstUpdate();
          }, 1000);

      }, error => {
        console.log('error_order', error);
      }
    );


  }

  onGet_paying() {
    this.productService.get_paying().subscribe(
      res => {
        this.paying_order = res['body'][0];
       // console.log('paying=>', res['body'][0]);

      }, error => {
        console.log('err_paying=>', error);
      }
    );
  }

  onSet_other(data: any) {
    // console.log('data_order=>', data);
   // console.log('delivery=> ', this.data_delivery[0]);
   // console.log('paying=>', this.paying_order);
    this.name_paying = this.paying_order.name_type;
    this.userService.get_address().subscribe(
      res => {
       // console.log('address', res['body'][0]);
        for (let i = 0; i < this.shopCart.length; i++) {


          if (this.shopCart[i].order_status === 'ORDERING') {

            if (this.count_update === 0) {
              this.data_order = this.fb.group(
              {
                body: {
                  id_order: this.shopCart[i].id_order,
                  order_status: 'ORDERING',
                  order_item: [{
                    id_item: data.id_item,
                    id_variation: data.id_variation,
                    quantity: data.quantity,
                    id_ship: this.data_delivery[0].id_ship,
                  }],
                  id_address: res['body'][0].id_address,
                  id_type_payment: this.paying_order.id_type_payment
              }
            }
          );
        }



          this.on_Setorderitem(data);
          // console.log('order_update=>', this.data_order.value['body'].order_item);
            if (this.count_update < this.order_item.length) {
              this.update_first[this.count_update] = this.data_order.value;

              // console.log('count_update=>', this.count_update);

            }
        }


        }

        // setTimeout(() => {
        //   // console.log('data_update=>', this.data_order.value);
        //   this.on_firstUpdate();
        // }, 2000);





      }, error => {
        console.log('error', error);
      }
    );



  }

  on_Setorderitem(data: any) {
    this.orderitem_update = this.fb.group({
        id_item: data.id_item,
        id_variation: data.id_variation,
        quantity: data.quantity,
        id_ship: this.data_delivery[0].id_ship,
    });





    this.keep_orderitem[this.count_update] = this.orderitem_update.value;

    console.log('keep_order=>', this.orderitem_update.value);
    this.count_update = this.count_update + 1;
    // console.log('item_array=>', this.orderitem_update.value);
    // this.data_order.value['body'].order_item.push(this.orderitem_update.value);

    // console.log('update_order=>', this.data_order.value);
  }

  on_firstUpdate() {
    // console.log('first_update=>', this.order_item.length);

      this.get_formUpdate();
          // console.log('data_update=>', this.update_first[0]);
          this.productService.update_order( this.data_order.value).subscribe(
            res => {
              console.log('update_order=>', res);

            }, error => {

              console.log('error_update=>', error);
            }

          );
          // this.access_update = this.access_update + 1;



  }

  get_formUpdate() {

    console.log('keep_length=>', this.keep_orderitem.length);

    for ( let i = 1; i <  this.keep_orderitem.length; i++) {
      console.log('keep_item=>', this.keep_orderitem[i]);
      this.data_order.value['body'].order_item.push(this.keep_orderitem[i]);
    }


    console.log('form_update=>', this.data_order.value);
  }

  on_updateOrder(data: any) {
    this.productService.update_order(data).subscribe(
      res => {
        console.log('data_update=>', data);
        console.log('update_order=>', res);
      }, error => {
        console.log('error_update=>', error);
      }
    );
  }



  onRemove_order() {
    localStorage.removeItem('order_all');
    for (let i = 0; i < this.order_all; i++) {
      localStorage.removeItem('order_' + i.toString());
    }
  }
  getImageFromService(id: any, namePic: any, j: any) {
    this.productService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data, j);

      },
      error => {

        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob, j: any) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow[j] = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  openDialog(id: any, ind: any): void {
   // alert(this.ship_ping[ind]);
   this.ind_present = ind;
    let dialogRef = this.dialog.open(MyShippingComponent, {
      data: {
        id: id,
        name: this.ship_ping[ind]
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
       // console.log(result);
       // console.log('ship_set=>', result);
       this.ship_ping[this.ind_present] = result.name_ship;
       this.time_ship[this.ind_present] = result.time_ship;
       this.price_ship[this.ind_present] = result.price;
       this.price_all[this.ind_present] = this.price_ship[this.ind_present] + this.store_price[this.ind_present];

       this.data_order = this.fb.group(
        {
          body: {
            id_order: this.id_order,
            order_status: 'ORDERING',
            order_item: [{
              id_item: this.order_item[ind].id_item,
              id_variation: this.order_item[ind].id_variation,
              quantity: this.order_item[ind].quantity,
              id_ship: result.id_ship,
            }
            ],
          }
        }
      );

     // console.log('order_item1=>', this.order_item[ind]);
        console.log('data_update2=>', this.data_order.value);
        this.on_updateOrder(this.data_order.value);
        this.final_ship = 0;
        for (let i = 0; i < this.price_ship.length; i++) {
          this.final_ship = this.final_ship + this.price_ship[i];

        }
        this.final_price = this.final_ship + this.price_all_product;
      }
    );
  }

  go_payorder() {

    // alert('acess');
    this.data_ordered = this.fb.group({
      body: {
        id_order: this.id_order,
       order_status: "ORDERED"
      }
    });

  // console.log('data_ordered=>', this.data_ordered.value);
    this.productService.update_ordered(this.data_ordered.value).subscribe(
      res => {
      //  console.log('res_ordered=>', res);
        localStorage.setItem('amount', this.final_price);
        this.onRemove_order();
        this.delete_basket(this.id_item);
        this.router.navigate(['/mado/payorder/', this.id_order]);

      }, error => {
        console.log('err_ordered', error);
      }
    );

  }

  delete_basket(id: any) {
    for (let i = 0; i < id.length; i++) {
      this.shopcartService.deleteProduct(id).subscribe(
        res => {
       //   console.log('delete_product=>', res);
          location.reload();
        }, error => {
          console.log('err', error);
        }
      );
    }
  }

  // on_odered() {
  //   this.data_ordered = this.fb.group({
  //     id_order: this.id_order,
  //     order_status: "ORDERED"
  //   });

  //   console.log('data_ordered=>', this.data_ordered.value);
  //   this.productService.update_ordered(this.data_order.value).subscribe(
  //     res => {
  //       console.log('res_ordered=>', res);

  //     }, error => {
  //       console.log('err_ordered', error);
  //     }
  //   );

  // }

  open_paying(name_pay: any) {
    // alert(name_pay);
    let dialogRef = this.dialog.open(MyPayingComponent, {
      data: {
        name: name_pay
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
     //   console.log(result);
        if (result !== null) {
          this.name_paying = result;
        }
      }
    );
  }


}
