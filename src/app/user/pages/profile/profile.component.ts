import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  detail: any;
  name: any;
  surname: any;
  phone: any;
  email: any;
  dob: any;

  //ส่วนของการ show image
  isImageLoading: any;
  imageToShow: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    this.userService.getUser_one(this.user).subscribe(
      response => {
        this.detail = response['body'][0];
        this.name = this.detail.name;
        this.surname = this.detail.sername;
        this.phone = this.detail.phone;
        this.email = this.detail.email;
        this.dob = this.detail.dob;
        console.log('response', response['body'][0]);
      },
      error => {
        console.log('error' , error);
      }
    );
    this.getImageFormService();

  }

  getImageFormService() {
    this.isImageLoading = true;
    this.userService.getImage().subscribe(
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


}
