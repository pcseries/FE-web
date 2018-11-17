import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { collapse } from '../../animation/collapse-animate';
import { GlobalService } from '../../../../services/global.service';
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'du-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [collapse]
})
export class MenuComponent implements OnInit {
  c: boolean;

  @Input() menuInfo: any;
  @Output() passSidebar = new EventEmitter();

  check: boolean;

  constructor(private _globalService: GlobalService, private router: Router) { }




  private isToggleOn(item) {
    item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
    // if (item.toggle === 'off') {
    //   this.check = true;
    //   this.passSidebar.emit(this.check);
    //  }

  }

  private _selectItem(item) {
    //this._globalService._isActived(item);
    console.log(item);
    //this._globalService.dataBusChanged('isActived', item);
    //alert(item.path);
    let p = item.path.split('/');
    //alert(p[1]);

    if (p[1] === 'editProfile' ) {
      item.toggle = 'on';

    } else {
      //this.check = true;
      item.toggle = 'off';
      this.isToggleOn(item);
      //
      //this.passSidebar.emit(this.check);

    }

  }

  ngOnInit () {
    this.check = false;

  }


}
