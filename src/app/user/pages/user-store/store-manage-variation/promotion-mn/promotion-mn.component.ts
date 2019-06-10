import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';






@Component({
  selector: 'app-promotion-mn',
  templateUrl: './promotion-mn.component.html',
  styleUrls: ['./promotion-mn.component.css']

})
export class PromotionMNComponent implements OnInit {


  myForm = new FormGroup({
    myDateYMD: new FormControl(new Date()),
    myDateFull: new FormControl(new Date()),
    myDateMDY: new FormControl(new Date())
  });

  id_variation: any;

  status_promo: any;
  promo_pd: any;

  imageToShow: any;
  name_product: any;
  name_variation: any;
  price: any;
  new_price: any;

  date_start: any;
  date_end: any;

  data_DT1 = [];
  data_DT2 = [];
  edit_data: any;

  edit_promotion: FormGroup;
  add_promotions: FormGroup;
  check_1: any;
  check_2: any;
  check_3: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.check_1 = false;
    this.check_2 = false;
    this.check_3 = false;
    this.edit_data = false;
    this.status_promo = false;
    this.id_variation = this.route.snapshot.paramMap.get('id');

    this.get_promoByid(this.id_variation);

  }

  get_promoByid(id: any) {

    this.productsService.get_promotion(id).subscribe(
      res => {

        this.status_promo = true;
        this.promo_pd = res['body'].promotion_product[0];
        console.log('promoOK=>', this.promo_pd);
        this.name_product = this.promo_pd.name_product;
        this.name_variation = this.promo_pd.product_variation[0].name;
        this.price = this.promo_pd.product_variation[0].price;
        this.new_price = this.promo_pd.product_variation[0].new_price;

        this.data_DT1 = this.promo_pd.product_variation[0].time_start.split(' ');
        this.date_start = this.data_DT1[0];
        this.data_DT2 = this.promo_pd.product_variation[0].time_end.split(' ');
        this.date_end = this.data_DT2[0]
        this.getImageFromService(this.promo_pd.id_product, this.promo_pd.pic_product);
      }, err => {
        console.log('promo=>', err);
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

  allow_edit() {
    this.edit_data = true;
  }

  on_editSuccess(priceOld: HTMLInputElement, priceNew: HTMLInputElement,
    dateStart: HTMLInputElement, timeStart: HTMLInputElement,
    dateEnd: HTMLInputElement, timeEnd: HTMLInputElement) {
    // console.log('price_old', priceOld.value);
    // console.log('price_new', priceNew.value);
    // console.log('date_start', dateStart.value);
    // console.log('time_start', timeStart.value);
    // console.log('date_end', dateEnd.value);
    // console.log('timeEnd', timeEnd.value);

    this.edit_promotion = this.fb.group({
      id_product_has_promo: this.promo_pd.product_variation[0].id_product_has_promo,
      new_price: priceNew.value,
      time_start: dateStart.value + ' ' + timeStart.value + ':00',
      time_end: dateEnd.value + ' ' + timeEnd.value + ':00'
    });

    this.productsService.edit_promo(this.edit_promotion.value).subscribe(
      res => {
        console.log('editpromoOk', res);
        alert('แก้ไขสำเร็จ');
        this.edit_data = false;
        this.ngOnInit();
      }, err => {
        console.log('editpromo', err);
      }
    );

    this.edit_data = false;
  }

  on_cancelEdit() {
    this.edit_data = false;
  }

  on_deletePromotion() {
    console.log('id_promo', this.promo_pd.product_variation[0].id_product_has_promo);


    if (confirm('ยืนยันการลบโปรโมชั่น')) {
      this.productsService.delete_promo(this.promo_pd.product_variation[0].id_product_has_promo).subscribe(
        res => {
          console.log('delete_promo', res);
          alert(res['msg']);
          this.ngOnInit();
        }, err => {
          console.log('delete_promo', err['msg']);
          alert(err['msg']);
        }
      );
    }
  }

  // click1() {
  //   this.check_1 = true;
  // }

  // click2() {
  //   this.check_2 = true;
  // }

  click3() {
    this.check_3 = true;
  }

  back_page() {
    let page = localStorage.getItem('backpage1');
    localStorage.removeItem('backpage1');
    this.router.navigate(['user/store/manageStore/', page]);
  }

  add_promotion(price: HTMLInputElement, date_start: HTMLInputElement,
    timeStart: HTMLInputElement , date_end: HTMLInputElement, tineEnd: HTMLInputElement) {
      this.add_promotions = this.fb.group({
        id_promo_type: 1,
        id_product_variation: parseInt(this.id_variation , 10) ,
        new_price: price.value,
        time_start: date_start.value + ' ' + timeStart.value + ':00',
        time_end: date_end.value + ' ' + tineEnd.value + ':00'
      });


      console.log('data_add', this.add_promotions.value);

      this.productsService.addProduct_promotion(this.add_promotions.value).subscribe(
        res => {
          console.log('add_promotionOk', res);
          alert('เพิ่มโปรโมชั่นสำเร็จ');
          this.ngOnInit();
        }, err => {
          console.log('add_promoErr', err);
        }
      );
  }

}
