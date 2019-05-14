import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-add-reject-comment',
  templateUrl: './add-reject-comment.component.html',
  styleUrls: ['./add-reject-comment.component.css']
})
export class AddRejectCommentComponent implements OnInit {


  data_reject: FormGroup;

  url_data: any;
  data = [];
  id_item: any;
  pre_page: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.url_data = this.route.snapshot.paramMap.get('id');

    this.data = this.url_data.split("_");

    this.pre_page = parseInt(this.data[0] , 10);
    this.id_item = parseInt(this.data[1] , 10);
  }


  addComment(text: HTMLInputElement) {
    console.log(text.value);
    this.data_reject = this.fb.group({
      id_item: this.id_item,
      order_item_status: 'REJECTED',
      description_reject: text.value
    });

    this.productsService.onreject_product(this.data_reject.value).subscribe(
      res => {
        console.log('reject_product=>', res);
        alert('เพิ่มความเห็น สำเร็จ');
        this.router.navigate(['user/payHistory/', this.pre_page]);
            // setTimeout(() => {
            //   location.reload();
            // }, 1000);

      }, err => {
        console.log('err_reject=>', err);
      }
    );

  }

  cancelComment() {
    this.router.navigate(['user/payHistory/', this.pre_page]);
  }

}
