import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/admin/user.service';

@Component({
  selector: 'app-pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss']
})
export class PagesTopComponent implements OnInit {

  avatarImgSrc: string = 'assets/images/avatar.png';
  userName: string ;
  status: string;
  isAdmin: boolean = false;
  isSupperadmin: boolean = false;


  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };
  isImageLoading: any;
  imageToShow: any;


  constructor(private _globalService: GlobalService,  private router: Router,
    private imageService: UserService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('user');
    if (localStorage.getItem('permission') === "ADMIN") {
      this.isAdmin = true;
      this.status = "Admin"
    } else if (localStorage.getItem('permission') === "SUPERADMIN") {
      this.isSupperadmin = true;
      this.status = "Superadmin"
    } else {
      this.status = "User";
    }

    this.getImageFromService();
  }

  getImageFromService() {
    this.isImageLoading = true;
    this.imageService.getImage().subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
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
