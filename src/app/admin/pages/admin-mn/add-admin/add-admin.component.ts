import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { RegisterService } from 'src/app/services/register.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AdminMNComponent } from '../admin-mn.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = (control && control.parent.get('password').value !== control.parent.get('confirmPassword').value&&  control.parent.dirty);

    return (invalidParent);
  }
}


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
  providers: [AdminService]
})
export class AddAdminComponent implements OnInit {

  userRegister: FormGroup;
  loading: boolean;

  public date = new Date();

  matcher = new MyErrorStateMatcher();
  transfer = new AdminMNComponent();


  constructor(private fb: FormBuilder, private AddadminService: AdminService,
    private router: Router) {
      this.userRegister = this.fb.group( {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required , Validators.minLength(6) , Validators.maxLength(24)]],
        confirmPassword: [''],
        name: ['', Validators.required],
        sername: ['', Validators.required],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+[A-Z]?')]],
        sex: ['male'],
        dob: ['' , Validators.required]
      }, { validator: this.checkPasswords } );
   }

  ngOnInit() {

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}




  onRegister() {
    const md5 = new Md5();
    const year = this.userRegister.value.dob.getFullYear();
    const month = this.userRegister.value.dob.getMonth() ;
    const date = this.userRegister.value.dob.getDate();
    console.log(this.userRegister.value.dob.getMonth());
    this.userRegister.value.dob = year + '-' + month + '-' + date;

    this.userRegister.value.password = md5.appendStr(this.userRegister.value.password).end();
    console.log(this.userRegister.value);
    this.AddadminService.addAdmin(this.userRegister.value).subscribe(
       response => {
         console.log('response', response);
         if (response['msg'] === "Email have been used") {
          alert(response['msg']);
          location.reload();
         } else if (response['msg'] === "Username have been used") {
          alert(response['msg']);
          location.reload();
         } else {
            alert('Add successful');
           location.reload();
         }
       },
       error => {
         console.log('error', error);
       }
     );
  }


}
