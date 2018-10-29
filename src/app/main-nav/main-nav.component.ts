import { Component, OnInit, } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/src/render3';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  Islogin = false;
  nameUser: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      console.log(localStorage.getItem('user'));
      this.nameUser = localStorage.getItem('user');
      this.Islogin = true;
      this.router.navigate(['/mado']);
    }
  }



  onProfile() {
    this.router.navigate(['/user/profile']);
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
    location.reload();
  }

}
