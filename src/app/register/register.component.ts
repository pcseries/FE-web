import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PasswordValidation  } from './validators';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = (control && control.parent.get('password').value !== control.parent.get('confirmPassword').value&&  control.parent.dirty);

    return (invalidParent);
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  userRegister: FormGroup;
  loading: boolean;

  public date = new Date();

  matcher = new MyErrorStateMatcher();


  constructor(private fb: FormBuilder, private registerServic: RegisterService,
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
    console.log('register', this.userRegister.value.dob);
    const year = this.userRegister.value.dob.getFullYear();
    const month = this.userRegister.value.dob.getMonth() ;
    const date = this.userRegister.value.dob.getDate();
    console.log(this.userRegister.value.dob.getMonth());
    this.userRegister.value.dob = year + '-' + (month+1) + '-' + date;

    this.userRegister.value.password = md5.appendStr(this.userRegister.value.password).end();
    console.log(this.userRegister.value);
    this.registerServic.registerUser(this.userRegister.value).subscribe(
       response => {
         console.log('response', response);
         if (response['msg'] === "Email have been used") {
          alert(response['msg']);
          location.reload();
         } else if (response['msg'] === "Username have been used") {
          alert(response['msg']);
          location.reload();
         } else {
            alert('register successful');
            this.router.navigate(['/mado/listproduct']);
         }
       },
       error => {
         console.log('error', error);
       }
     );
  }



}


