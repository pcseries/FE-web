import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/admin/user.service';
import { ProfileService } from 'src/app/services/user/profile.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [UserService, ProfileService]
})
export class EditUserComponent implements OnInit {

  editProfile: FormGroup;

  userName: any;
  detail: any;
  name: any;
  surname: any;
  phone: any;
  email: any;
  dob: any;
  sex: any;


  isImageLoading: any;
  imageToShow: any;


  public date = new Date("en-US");

  constructor(private fb: FormBuilder, private userService: UserService,
    private profileService: ProfileService) {
    this.infoForm();
  }

  ngOnInit() {

    this.userName = localStorage.getItem('user');
    this.userService.getUser_one(this.userName).subscribe(
      response => {
        this.detail = response['body'][0];
        this.name = this.detail.name;
        this.surname = this.detail.sername;
        this.phone = this.detail.phone;
        this.email = this.detail.email;
        this.dob = this.detail.dob;
        this.sex = this.detail.sex;
        console.log('name', response);
        this.infoForm();
      },
      error => {
        console.log('error', error);
      }
    );

    this.getImageFormService();

  }


  infoForm() {
    this.editProfile = this.fb.group({
      name: [this.name],
      sername: [this.surname],
      phone: [this.phone],
      email: [this.email],
      sex: [this.sex],
      dob: [this.dob]
    });
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


  onEdit() {
    let dateString = this.editProfile.value.dob;
    let newDate = new Date(dateString);
    console.log('newDate', newDate);
    this.convertDate(newDate);
    this.profileService.editProfile(this.editProfile.value).subscribe(
      response => {
        console.log('res', response);
        console.log('group', this.editProfile.value);
        alert('Edit Successfull');
        this.ngOnInit();
      },
      error => {
        console.log('group', this.editProfile.value);
        console.log('error', error);
      }
    );
  }

  convertDate(dateTime: any) {

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() ;
    const date = dateTime.getDate();
    console.log(dateTime.getMonth());
    this.editProfile.value.dob = year + '-' + (month+1) + '-' + date;
    console.log('dob', this.editProfile.value.dob);
  }


}