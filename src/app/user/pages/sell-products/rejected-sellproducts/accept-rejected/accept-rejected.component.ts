import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accept-rejected',
  templateUrl: './accept-rejected.component.html',
  styleUrls: ['./accept-rejected.component.css']
})
export class AcceptRejectedComponent implements OnInit {

  id_item: any;
  url_data: any;
  selet_url = [];

  rejected_form: FormGroup;
  stat_show: any;
  keep_stat: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.url_data = this.route.snapshot.paramMap.get('id');

    this.selet_url = this.url_data.split('_');

    this.id_item = parseInt(this.selet_url[1]  , 10);
    this.keep_stat = parseInt(this.selet_url[2], 10);


   // this.get_product();
  }




  on_accept() {
   // alert('accept');
   this.create_rejectForm('YES');


  }

  on_cancel() {
    this.create_rejectForm('NO');
  }

  create_rejectForm(data: any) {
    this.rejected_form = this.fb.group({
      id_item: this.id_item,
      confirm: data
    });

    console.log('seller accept=>', this.rejected_form.value);

    const c = confirm('คุณแน่ใจหรือไม่');

    if (c) {
      this.productsService.update_reject(this.rejected_form.value).subscribe(
        res => {
          console.log('update_stat=>', res);
          if (data === 'YES') {
            this.router.navigate(['user/sellProducts/4']);
          } else {
            this.router.navigate(['user/sellProducts/5']);
          }
        }, err => {
          console.log('err_stat=>', err);
        }
      );
    }

  }

}
