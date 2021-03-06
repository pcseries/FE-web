import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { MenuAdminService } from '../../../../services/menu/menu-admin.service';
import { MenuAdmin2Service } from 'src/app/services/menu/menu-admin2.service';



@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.html',
  styleUrls: ['./sidebar-admin.scss'],
  providers: [MenuAdminService, MenuAdmin2Service]
})

export class SidebarAdminComponent implements OnInit {

  public menuInfo: Array<any> = [];
  public sidebarToggle = true;

  constructor(private _menuService: MenuAdminService,
    public _globalService: GlobalService, private menu2Service: MenuAdmin2Service ) { }

  ngOnInit() {
    if (localStorage.getItem('permission') === "SUPERADMIN") {
      this.menuInfo = this._menuService.putSidebarJson();
    } else {
      this.menuInfo = this.menu2Service.putSidebarJson();
    }
    this._sidebarToggle();
    if (localStorage.getItem('permission') === "SUPERADMIN") {
      this._menuService.selectItem(this.menuInfo);
    } else {
      this.menu2Service.selectItem(this.menuInfo);
    }
    this._isSelectItem(this.menuInfo);
  }

  public _sidebarToggle() {
    // this._globalService._sidebarToggleState(true);
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */
    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });

  }

  _isSelectItem(item) {
    for (const i in item) {
      if (item[i].children) {
        for (const index in item[i].children) {
          if (item[i].children[index].isActive || item[i].children[index].toggle === 'on') {
            item[i].toggle = 'on';
            break;
          } else {
            this._isSelectItem(item[i].children);
          }
        }
      }
    }
  }
}
