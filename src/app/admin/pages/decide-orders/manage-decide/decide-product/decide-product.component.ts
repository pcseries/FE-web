import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-decide-product',
  templateUrl: './decide-product.component.html',
  styleUrls: ['./decide-product.component.css']
})
export class DecideProductComponent implements OnInit {


  des_stat: any;
  url_data: any;


  selet_url = [];
  id_order_history: any;
  data_pd: any;
  track_num: any;

  data_form: FormGroup;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.des_stat = false;
    this.url_data = this.route.snapshot.paramMap.get('id');
    this.selet_url = this.url_data.split('_');

    this.id_order_history = parseInt(this.selet_url[0], 10);

    this.get_stat(this.id_order_history);
  }

  get_stat(id: any) {
    this.adminService.get_decideProductByid(id).subscribe(
      res => {
        console.log('res_track=>', res['body'][0]);
        this.data_pd = res['body'][0];
        this.track_num = this.data_pd.tracking_number;
        if (this.track_num === null) {
          this.des_stat = true;
        }
      }, err => {
        console.log('err_track=>', err);
      }
    );
  }

  on_refund() {
   // alert('refund');
    this.data_form = this.fb.group({
      id_order_history: this.id_order_history,
      status: 'ADMIN_REJECTED'
    });

    console.log('refund=>', this.data_form.value);
    const c = confirm('คุณต้องการคืนเงินใช่ หรือไม่');
    if (c) {
      this.adminService.decide_product(this.data_form.value).subscribe(
        res => {
          console.log('decide_product=>', res);
          alert('คืนเงิน สำเร็จ');
          this.router.navigate(['admin/decideOrders']);
        } , err => {
          console.log('decide_product=>', err);
        }
      );
    }
  }

  on_complete() {
    // alert('complete');
    this.data_form = this.fb.group({
      id_order_history: this.id_order_history,
      status: 'COMPLETE'
    });

    console.log('complete=>', this.data_form.value);
    const c = confirm('คุณต้องการให้การสั่งซื้อสำเร็จใช่ หรือไม่');
    if (c) {
      this.adminService.decide_product(this.data_form.value).subscribe(
        res => {
          console.log('decide_product=>', res);
          alert('คำสั่งซื้อ สำเร็จ');
          this.router.navigate(['admin/decideOrders']);
        } , err => {
          console.log('decide_product=>', err);
        }
      );
    }
  }

  on_reject() {
   // alert('reject');
   this.data_form = this.fb.group({
    id_order_history: this.id_order_history,
    status: 'NOT_SHIP'
  });

  console.log('NOT_SHIP=>', this.data_form.value);
  const c = confirm('คุณต้องการปฏิเสธใช่ หรือไม่');
  if (c) {
    this.adminService.decide_product(this.data_form.value).subscribe(
      res => {
        console.log('decide_product=>', res);
        alert('การปฏิเสธ สำเร็จ');
        this.router.navigate(['admin/decideOrders']);
      } , err => {
        console.log('decide_product=>', err);
      }
    );
  }

  }
}
