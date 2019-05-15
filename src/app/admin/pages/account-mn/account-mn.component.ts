import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/services/admin/user.service';
import { BackendService } from 'src/app/services/backend.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-account-mn',
  templateUrl: './account-mn.component.html',
  styleUrls: ['./account-mn.component.css']
})
export class AccountMnComponent implements OnInit {

  userEdit: FormGroup;
  length: any;

  @Output() infoPass = new EventEmitter();
  @Output() editProfile = new EventEmitter();

  displayedColumns = [ 'username' , 'name', 'sername', 'email', 'status', 'actionsColumn'];// column จากservice json
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private myservice: BackendService,
    private userService: UserService,
    product: LoginService
     , private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.userService.getAdmin().subscribe(
      response => {
        //alert(response['body']);
        this.dataSource = new MatTableDataSource(response['body']);
        console.log(response['body']);
        //console.log(this.myservice.getData());
      },
      error => {
        //alert('error');
        console.log('error', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDelete(getUsername: any) {
    // ทำ confirm ให้ด้วยนาจาา
    console.dir(getUsername);
    let c = confirm('Are you sure delete');
    if (c == true) {
      //alert('delete complete');
       this.userService.deleteUser(getUsername).subscribe(
        response => {
         console.log('response', response);
         this.ngOnInit();
       },
       error => {
         console.log('error', error);
       }
     );
    }

  }

  checkStatus(status: any) {
    if (status === 'ACTIVE') {
      return true;
    } else {
      return false;
    }
  }

 // เหลือ put data
  change(user: any) {
     //alert(user);
     this.userEdit = this.fb.group({
      username: [user]
     });
     console.log(this.userEdit.value);
      this.userService.blokUser(this.userEdit.value).subscribe(
        response => {
          console.log('response', response);
          this.ngOnInit();
        },
        error => {
          console.log('error', error);
        }
      );
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  active(user: any) {
    this.userEdit = this.fb.group({
      username: [user]
     });
     this.userService.unblockUser(this.userEdit.value).subscribe(
       response => {
          console.log('response', response);
          this.ngOnInit();
       },
       error => {
          console.log('error', error);
       }
     );
  }

  onInfo(name) {
    const info = {
      stat: true,
      uName: name
    };
    this.infoPass.emit(info);
  }

  onEdit(name) {
    const info = {
      stat: true,
      uName: name
    };
    this.editProfile.emit(info);
  }


}
