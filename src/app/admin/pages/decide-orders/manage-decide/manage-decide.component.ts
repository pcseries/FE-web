import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-decide',
  templateUrl: './manage-decide.component.html',
  styleUrls: ['./manage-decide.component.css']
})
export class ManageDecideComponent implements OnInit {



  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  back_pageDecide() {
    this.router.navigate(['admin/decideOrders']);
  }

}
