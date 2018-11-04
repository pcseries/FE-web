import { Component, OnInit , Input } from '@angular/core';
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

  constructor(private _globalService: GlobalService, private router: Router) { }

  private isToggleOn(item) {
    item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
    // if (item.toggle === 'off') {
    //   location.reload();
    // }
  }

  private _selectItem(item) {
    //this._globalService._isActived(item);
    console.log(item);
    //this._globalService.dataBusChanged('isActived', item);
    //alert(item.path);
    let p = item.path.split('/');
    //alert(p[1]);
    if (p[1] === 'adminMN' ) {
      item.toggle = 'on';

    } else {
      item.toggle = 'off';
      //location.reload();

    }

  }

  ngOnInit() {

  }


}
