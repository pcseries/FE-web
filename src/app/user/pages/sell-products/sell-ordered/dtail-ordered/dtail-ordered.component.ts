import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dtail-ordered',
  templateUrl: './dtail-ordered.component.html',
  styleUrls: ['./dtail-ordered.component.css']
})
export class DtailOrderedComponent implements OnInit {

  send_text: any;

  page: any;
  split_num: any;

  ship: any;
  go_delivery: any;
  reject_stat: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.reject_stat = false;
    this.send_text = this.route.snapshot.paramMap.get('id');
    this.split_num = this.send_text.split('_');

    // console.log(this.split_num);
    this.set_status();
  }


  set_status() {
    const stat =  parseInt(this.split_num[0] , 10);

    if (stat === 0) {
      this.ship = false;
      this.go_delivery = false;
    } else if( stat === 5) {
      this.reject_stat = true;
      this.ship = true;
    } else {
      this.ship = true;
      this.go_delivery = true;
    }
  }

  back_page() {

    this.page = parseInt(this.split_num[0] , 10);
    this.router.navigate(['/user/sellProducts/', this.page]);
  }

}
