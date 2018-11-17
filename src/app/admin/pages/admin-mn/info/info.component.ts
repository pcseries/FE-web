import { Component, OnInit, Input } from '@angular/core';
import { UrlResolver } from '@angular/compiler';
import { UserService } from 'src/app/services/admin/user.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [UserService]
})
export class InfoComponent implements OnInit {

  @Input() user: any;
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

    this.userService.getUser_one(this.user.uName).subscribe(
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
    this.getImageFormService(this.user.uName);

  }

  getImageFormService(username: any) {
    this.isImageLoading = true;
    this.userService.getImageUser_one(username).subscribe(
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
