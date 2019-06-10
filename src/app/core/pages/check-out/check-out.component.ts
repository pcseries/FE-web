import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { P } from '@angular/core/src/render3';
import { ShopcartService } from 'src/app/services/core/shopcart.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  select_order = [];
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

  id_order1: any;
  order_byid: any;
  id_ship = [];
  id_address: any;
  id_pay: any;
  load_checkpoint: any;

  // จัดการโปรโมชั่น
  switch_price = [];

  constructor(private userService: UserService,
    private shopcartService: ShopcartService,
    private productService: ProductsService,
    public dialog: MatDialog,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }


  ngOnInit() {
    this.load_checkpoint = false;
    this.id_order1 = parseInt(localStorage.getItem('id_order'), 10) ;

    this.access_update = 0;
    this.count_update = 0;
    this.id_product = this.route.snapshot.paramMap.get('id');

    // alert(this.order_all);
    this.onGet_paying();

    this.final_price = 0;
    this.final_ship = 0;
    this.price_all_product = 0;
    this.userService.get_address().subscribe(
      res => {
         console.log('res_address=>', res);

        if (res['body'].length === 0) {
          this.router.navigate(['mado/addAdress']);
        }
        this.res_data = res['body'][0];
        this.receiver = this.res_data.receiver;
        this.phone_receiver = this.res_data.phone_receiver;
        this.address = this.res_data.address;
        this.sub_district = this.res_data.sub_district;
        this.district = this.res_data.district;
        this.province = this.res_data.province;
        this.postal_code = this.res_data.postal_code;
        this.id_address = this.res_data.id_address;
        this.get_productOrders();
        // this.get_payingOrder();
      }, error => {
        console.log('error', error);
      }
    );





  }


  get_productOrders() {
    this.shopcartService.getOrder_byid(this.id_order1).subscribe(
      res => {
        console.log('res_order=>', res['body'].order[0]);
        this.order_byid = res['body'].order[0];
        this.selectProduct = res['body'].order[0].order_item;


        for (let i = 0; i < this.selectProduct.length; i++) {

          console.log('newPrice_selected', this.selectProduct[i].new_price);

          if (this.selectProduct[i].new_price === undefined) {
            this.switch_price[i] = false;
            this.store_price[i] = this.selectProduct[i].price * this.selectProduct[i].quantity;
          } else {
            this.switch_price[i] = true;
            this.store_price[i] = this.selectProduct[i].new_price * this.selectProduct[i].quantity;
          }

          let id = this.selectProduct[i].id_product;
          let namePic = this.selectProduct[i].pic_product;

          this.get_pay();
          this.get_shipping(id, i);

          this.getImageFromService(id, namePic, i);
          setTimeout(() => {
            this.onSet_other(this.selectProduct[i] , i);
            this.get_payingOrder();
        }, 800);

        }




      }, err => {
        console.log('err_order=>', err);
      }
    );


  }

  get_pay() {
    let pay: any;
    this.productService.get_paying().subscribe(
      res => {
         console.log('Paying_all=>', res['body'][0]);
         pay = res['body'][0];
         this.id_pay = pay.id_type_payment;
        this.name_paying = pay.name_type;


      }, error => {
        console.log('err_pay=>', error);
      }
    );
  }

  get_shipping(id: any, ind: any) {
    this.storeService.get_shipping(id).subscribe(
      res => {
        console.log('res_ship=>', res['body'].product_delivery);
        let price_min = res['body'].product_delivery[0].price;
        this.price_ship[ind] = price_min;

        let delivery = res['body'].product_delivery;

        this.ship_ping[ind] = delivery[0].name_ship;
        this.time_ship[ind] = delivery[0].time_ship;
        this.id_ship[ind] = delivery[0].id_ship;

        for (let i = 1 ; i < delivery.length; i++) {
          if (price_min > delivery[i].price) {
            this.ship_ping[ind] = delivery[i].name_ship;
            this.time_ship[ind] = delivery[i].time_ship;
            this.price_ship[ind] = delivery[i].price;
            this.id_ship[ind] = delivery[i].id_ship;
          }
        }

        this.price_all[ind] = this.store_price[ind] + this.price_ship[ind];


        this.set_priceFinal(ind);

      }, err => {
        console.log('err_ship', err);
      }
    );
  }


  set_priceFinal(ind: any) {
    console.log('store_price=>', this.store_price[ind]);
    this.price_all_product = this.price_all_product + this.store_price[ind];
    this.final_ship = this.final_ship + this.price_ship[ind];

    setTimeout(() => {
      this.final_price = this.price_all_product + this.final_ship;
   }, 500);
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

  onSet_other(data: any , ind: any) {

    // console.log('data_setother=>', data);
    // console.log('order=>', this.order_byid);

    if (this.count_update === 0) {
      this.data_order = this.fb.group(
      {
        body: {
          id_order: this.order_byid.id_order,
          order_status: 'ORDERING',
          order_item: [{
            id_item: data.id_item,
            id_variation: data.id_variation,
            quantity: data.quantity,
            id_ship: this.id_ship[ind],
          }],
          id_address: this.id_address,
          id_type_payment: this.id_pay
      }
    }
  );

  console.log('data_order=>', this.data_order.value);


}   else {
  this.on_Setorderitem(data , ind);

}

this.count_update = this.count_update + 1;


  }

  on_Setorderitem(data: any, ind: any) {
    console.log('id_ship=>', this.id_ship[ind]);
    this.orderitem_update = this.fb.group({
        id_item: data.id_item,
        id_variation: data.id_variation,
        quantity: data.quantity,
        id_ship: this.id_ship[ind],
    });





    this.keep_orderitem[this.count_update] = this.orderitem_update.value;

    console.log('keep_order=>', this.orderitem_update.value);


  }

  on_firstUpdate() {


    setTimeout(() => {
      this.get_formUpdate();
    }, 500);
    // this.get_formUpdate();




  }

  get_formUpdate() {

    console.log('keep_length=>', this.keep_orderitem.length);

    for ( let i = 1; i <  this.keep_orderitem.length; i++) {
      console.log('keep_item=>', this.keep_orderitem[i]);
      this.data_order.value['body'].order_item.push(this.keep_orderitem[i]);

    }

  //   setTimeout(() => {
  //     console.log('form_update=>', this.data_order.value);

  //   this.productService.update_order( this.data_order.value).subscribe(
  //     res => {
  //       console.log('update_order=>', res);

  //     }, error => {

  //       console.log('error_update=>', error);
  //     }

  //   );
  //  }, 500);


   console.log('form_update=>', this.data_order.value);

   this.productService.update_order( this.data_order.value).subscribe(
     res => {
       this.load_checkpoint = true;
       console.log('update_order=>', res);
    //  this.error_service();


     }, error => {
      this.load_checkpoint = true;
       console.log('error_update=>', error);
       this.error_service();
     }

   );

  }

  on_updateOrder(data: any) {
    this.productService.update_order(data).subscribe(
      res => {
       // console.log('data_update=>', data);
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
       console.log(result);
       let item = this.order_byid.order_item[ind];
       console.log('order_item=>', this.order_byid);
       this.ship_ping[this.ind_present] = result.name_ship;
       this.time_ship[this.ind_present] = result.time_ship;
       this.price_ship[this.ind_present] = result.price;
       this.price_all[this.ind_present] = this.price_ship[this.ind_present] + this.store_price[this.ind_present];

       this.data_order = this.fb.group(
        {
          body: {
            id_order: this.order_byid.id_order,
            order_status: 'ORDERING',
            order_item: [{
              id_item: item.id_item,
              id_variation: item.id_variation,
              quantity: item.quantity,
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
    let id = parseInt(this.id_order1, 10);
    this.data_ordered = this.fb.group({
      body: {
        id_order: this.id_order1,
       order_status: "ORDERED"
      }
    });

   console.log('data_ordered=>', this.data_ordered.value);
    this.productService.update_ordered(this.data_ordered.value).subscribe(
      res => {
      //  console.log('res_ordered=>', res);
        localStorage.setItem('amount', this.final_price);
        // this.onRemove_order();
        // this.delete_basket(this.id_item);
        this.router.navigate(['/mado/payorder/', this.id_order1]);

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

  get_payingOrder() {



    this.on_firstUpdate();


  }


  onChange_address() {
    console.log('route', this.router.url);
    this.router.navigate(['mado/manageAddress']);
  }

  error_service() {
    this._snackBar.open('error service', 'close', {
      duration: 2000,
    });
  }

}
