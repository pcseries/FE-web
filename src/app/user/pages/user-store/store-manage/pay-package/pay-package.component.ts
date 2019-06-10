import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/core/store.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pay-package',
  templateUrl: './pay-package.component.html',
  styleUrls: ['./pay-package.component.css']
})
export class PayPackageComponent implements OnInit {

  id_product: any;

  imageToShow: any;

  package_form: FormGroup;

  refreshInterval: any;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.id_product = this.route.snapshot.paramMap.get('id');

    this.pay_package();
  }


  pay_package() {
    this.package_form = this.fb.group({
      id_product: this.id_product
    });

    console.log('data', this.package_form.value);

    this.storeService.pay_package(this.package_form.value).subscribe(
      data => {
        this.createImageFromBlob(data);
      }, error => {
        console.log('error_pay=>', error);
      }
    );

    this.onget_status();
  }


  onget_status() {

    this.refreshInterval = setInterval(() => {
      this.on_status();
   } , 5000);
 }

 on_status() {

  this.storeService.get_stastusPaid(this.id_product).subscribe(
    res => {

      let data = res['body'];
      console.log('status', data[data.length - 1].status);

      if (data[data.length - 1].status === 'SUCCESS') {
        alert('จ่ายสำเร็จแล้ว');
        this.router.navigate(['user/store/manageStore/', this.id_product]);
        clearInterval(this.refreshInterval);
      }
    }
  );
 }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
