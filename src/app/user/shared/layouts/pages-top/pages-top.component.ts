import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss']
})
export class PagesTopComponent implements OnInit {

  avatarImgSrc: string = 'assets/images/avatar.png';
  userName: string = 'Folisise Chosielie';
  userPost: string = 'Musician, Player';


  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };


  constructor(private _globalService: GlobalService,  private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
    this.router.navigate(['/mado']);
  }

  public _sidebarToggle() {

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);



  }

}
