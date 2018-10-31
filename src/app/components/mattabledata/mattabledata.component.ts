import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/admin/user.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-mattabledata',
  templateUrl: './mattabledata.component.html',
  styleUrls: ['./mattabledata.component.css'],
  providers: [UserService]
})
export class MattabledataComponent implements OnInit {

  displayedColumns = ['name', 'sername', 'email', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private myservice: BackendService, private userService: UserService, product: LoginService) {}

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.myservice.getData());


      // this.userService.getUser().subscribe(
      //   response => {
      //     alert(response['body']);
      //   // this.dataSource = new MatTableDataSource(response['body']);
      //     console.log(response['body']);
      //     console.log(this.myservice.getData());
      //   },
      //   error => {
      //     alert('error');
      //     console.log('error', error);
      //   }
      // );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


}



