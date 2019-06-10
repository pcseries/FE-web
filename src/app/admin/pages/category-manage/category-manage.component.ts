import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddcategoryDialogComponent } from './addcategory-dialog/addcategory-dialog.component';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.css']
})
export class CategoryManageComponent implements OnInit {


  stat_name = [];
  name_data = [];

  data_Category: FormGroup;
  order_num = [];
  data_cate: any;

  displayedColumns = [ 'id_catagory' , 'name_catagory' , 'subcategories' , 'actionsColumn'];// column จากservice json
  dataSource: MatTableDataSource<any>;
  c_pages: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.get_category();
  }

  get_category() {
    this.adminService.get_category().subscribe(
      res => {
        console.log('get_category=>', res);
        this.dataSource = new MatTableDataSource(res['body']);
        for (let i = 0; i < res['body'].length; i++) {
          this.stat_name[i] = true;
          this.order_num[i] = i+1;
        }
        this.data_cate = res['body'];

      }, err => {
        console.log('get_category=>', err);
      }
    );
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

  on_addCategory() {
    const dialogRef = this.dialog.open(AddcategoryDialogComponent, {
      width: '500px'
     });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true && result.data !== '') {
        this.data_Category = this.fb.group({
          name_catagory: result.data
        });

        console.log('data_category=>', this.data_Category.value);

        this.adminService.add_category(this.data_Category.value).subscribe(
          res => {
            console.log('add_category=>', res);
            this.ngOnInit();
          }, err => {
            console.log('add_category=>', err);
          }
        );
      }
    });


  }

  on_editCategory(ind: any ) {
    // alert(ind);
     this.stat_name[ind] = false;


   }

   on_confirm(id_type: any ,ind: any , txt: HTMLInputElement) {


    this.data_Category = this.fb.group({
      id_catagory: id_type,
      name_catagory: txt.value
    });

    console.log('category_form=>', this.data_Category.value);

    this.adminService.update_category(this.data_Category.value).subscribe(
      res => {
        console.log('update_category=>', res);
        alert('อัพเดทเสร็จสิ้น');
        this.stat_name[ind] = true;
      }, err => {
        console.log('update_category=>', err);
      }
    );
   }

   on_delete(id_type: any) {
    const c = confirm('คุณต้องการลบประเภทสินค้า หรือไม่');

    if (c) {
      console.log('id=>', id_type);
      this.adminService.delete_category(id_type).subscribe(
        res => {
          console.log('delete_category=>', res);

          if (res.status === 400) {
            alert('ไม่สามารถลบได้เนื่องจาก มีประเภทย่อย');
          } else {
            this.ngOnInit();
          }

        }, err => {
          console.log('delete_category=>', err);
        }
      );
    }
   }

   on_seeSubcategory(ind: any) {
    // console.log('data_cate=>', this.data_cate[ind].name_catagory);
    localStorage.setItem('path', this.data_cate[ind].name_catagory + '>');
    this.c_pages = 0;
    localStorage.setItem('c_pages', this.c_pages);
    const next_page = this.data_cate[ind].id_catagory + '_' + this.data_cate[ind].parent_id + '_0';
    this.router.navigate(['admin/categoryManages/subcategory/', next_page]);
   }

}
