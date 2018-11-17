import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/admin/user.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
  providers: [UserService]
})
export class EditAdminComponent implements OnInit {

  editAdmin: FormGroup;
  @Input() userName;
   detail: any;
  name: any;
  surname: any;
  phone: any;
  email: any;
  dob: any;
  sex: any;



  isImageLoading: any;
  imageToShow: any;

  constructor(private fb: FormBuilder, private userService: UserService ) {
    this.adminForm();
  }

  ngOnInit() {
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
          this.adminForm();
        },
        error => {
          console.log('error', error);
        }
      );

      this.getImageFormService(this.userName);
  }

  adminForm() {
        this.editAdmin = this.fb.group({
          name: [this.name],
          sername: [this.surname],
          phone: [this.phone],
          email: [this.email],
          sex: [this.sex],
          dob: [this.dob]
        });


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


  onEdit() {
    let dateString = this.editAdmin.value.dob;
    let newDate = new Date(dateString);
    this.convertDate(newDate);
    this.userService.editMember(this.userName , this.editAdmin.value).subscribe(
      response => {
        alert('Edit Successfull');
        this.ngOnInit();
      },
      error => {
        console.log('error', error);
      }
    );
  }

  convertDate(dateTime: any) {

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() ;
    const date = dateTime.getDate();
    console.log(dateTime.getMonth());
    this.editAdmin.value.dob = year + '-' + (month+1) + '-' + date;
    console.log('dob', this.editAdmin.value.dob);
  }

}
