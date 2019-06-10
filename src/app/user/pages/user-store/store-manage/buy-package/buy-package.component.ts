import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/core/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buy-package',
  templateUrl: './buy-package.component.html',
  styleUrls: ['./buy-package.component.css']
})
export class BuyPackageComponent implements OnInit {

  id_product: any;
  package_list: any;

  first_click: any;
  buypackage_form: FormGroup;
  id_package: any;
  constructor(
    private storeService: StoreService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_product = this.route.snapshot.paramMap.get('id');;
    this.first_click = false;
    this.get_package();
  }


  get_package() {

    this.storeService.get_package().subscribe(
      res => {
        console.log('package', res['body']);
        this.package_list = res['body'];
      }, err => {
        console.log('package', err);
      }
    );

  }

  click_first(id: any){
    this.first_click = true;
    this.id_package = id;

  }

  back_page() {
    let page = localStorage.getItem('backpage1');
    localStorage.removeItem('backpage1');
    this.router.navigate(['user/store/manageStore/', page]);
  }

  add_package(date: HTMLInputElement) {
    let TD = [];
     TD = date.value.split('/');
    TD[2] = parseInt(TD[2], 10) ;
   // console.log(TD[2] + '-' + (TD[0] <= 9 ? '0' + TD[0] : TD[0]) + '-' + (TD[1]<=9 ? '0' + TD[1] : TD[1] ));

    let setdate = TD[2] + '-' + (TD[0] <= 9 ? '0' + TD[0] : TD[0]) + '-' + (TD[1]<=9 ? '0' + TD[1] : TD[1] );
  //  console.log('date-now', this.dateToYMD(new Date()));
    // form add
    this.buypackage_form = this.fb.group({
      id_product: parseInt(this.id_product , 10) ,
      id_package: this.id_package,
      date_buy: this.dateToYMD(new Date()),
      time_start: setdate
    });

    console.log('data', this.buypackage_form.value);

    this.storeService.add_productPackage(this.buypackage_form.value).subscribe(
      res => {
        console.log('addPackageOK', res);
        this.router.navigate(['user/store/payPackage/', this.id_product]);
      }, err => {
        console.log('addPackageErr', err);
      }
    );
  }

   dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

}
