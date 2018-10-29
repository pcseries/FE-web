import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RepeatPasswordEStateMatcher } from '../register/validators';
import { PasswordValidation, RepeatPasswordValidator  } from './validators';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';



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

  passwordsMatcher = new RepeatPasswordEStateMatcher;


  constructor(private fb: FormBuilder, private registerServic: RegisterService,
    private router: Router) {
      this.userRegister = this.fb.group( {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: new FormControl('', PasswordValidation),
        cFpassword: new FormControl(''),
        name: ['', Validators.required],
        sername: ['', Validators.required],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+[A-Z]?')]],
        sex: ['male'],
        dob: ['' , Validators.required]
      }, { validator: RepeatPasswordValidator } );
   }

  ngOnInit() {

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
           this.router.navigate(['/mado']);
         }
       },
       error => {
         console.log('error', error);
       }
     );
  }

}


