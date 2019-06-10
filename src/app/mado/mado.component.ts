import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mado',
  templateUrl: './mado.component.html',
  styleUrls: ['./mado.component.css']
})
export class MADOComponent implements OnInit {

  subnav_show: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {



    // if (this.router.url === '/mado/searchProducts/') {
    //   alert('dd');
    // } else {

    // }
  }

}
