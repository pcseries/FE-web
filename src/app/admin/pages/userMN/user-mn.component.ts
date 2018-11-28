import { Component, OnInit } from "@angular/core";



@Component({
  selector: 'app-user-mn',
  templateUrl: './user-mn.component.html',

})

export class UserMNcomponent implements OnInit {

  info = [];
  isSeeuser:boolean ;

  ngOnInit() {
    this.isSeeuser = false;
  }


  onInfoAdd(infoUser) {
    this.isSeeuser = infoUser.stat;
    this.info = infoUser;
  }

  backPage() {
    this.isSeeuser = false;
  }
}
