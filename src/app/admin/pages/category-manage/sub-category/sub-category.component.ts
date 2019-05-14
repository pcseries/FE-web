import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { timingSafeEqual } from 'crypto';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddcategoryDialogComponent } from '../addcategory-dialog/addcategory-dialog.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  stat_name = [];
  send_text: any;
  id_cate: any;
  id_parent: any;

  status_num = [];
  data_sub: any;
  order_num = [];
  data_cate: any;

  data_Category: FormGroup;
  edit_Category: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns = [ 'id_catagory' , 'name_catagory' , 'subcategories' , 'actionsColumn'];// column จากservice json

  parent_id: any;
  see_subcate = [];
  pre_page: any;
  pre_cate: any;
  pre_parent: any;

  stat_one: any;
  c_pages: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.send_text = this.route.snapshot.paramMap.get('id');
    this.status_num = this.send_text.split("_");

    this.id_cate = parseInt(this.status_num[0] , 10);
    this.id_parent = parseInt(this.status_num[1] , 10);

    this.pre_cate = parseInt(this.status_num[2] , 10);
    this.pre_parent = parseInt(this.status_num[3] , 10);

    this.get_subCategory(this.id_parent);
  }

  get_subCategory(id: any) {
    this.adminService.get_subCategory(id).subscribe(
      res => {
        console.log('res_subCate=>', res['body']);
        let data = res['body'];

        for (let i = 0; i < res['body'].length; i++) {
          if (data[i].id_catagory === this.id_cate) {
            this.data_sub = data[i].subcategories;

           // console.log('sub_cate=>', this.data_sub);
             // alert('sucess');
              this.parent_id = this.data_sub[0].parent_id;
              this.dataSource = new MatTableDataSource(this.data_sub);
              for (let j = 0; j < this.data_sub.length; j++) {
                console.log('sub_cate=>', this.data_sub[j]);
                if (this.data_sub[j].subcategories === undefined) {
                  this.see_subcate[j] = false;
                } else {
                  this.see_subcate[j] = true;
                }
                this.stat_name[j] = true;
                this.order_num[j] = j+1;
              }
              this.data_cate = this.data_sub;


          }

        }
      }, err => {
        console.log('res_subCate=>', err);
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

  on_seeSubcategory(ind: any) {
     console.log('data_cate=>', this.data_cate[ind].parent_id);
    // alert(this.data_cate[ind].parent_id);
    let page = parseInt(localStorage.getItem('c_pages'), 10) ;
    page = page + 1;
    localStorage.setItem('c_pages', page.toString());

    localStorage.setItem(page.toString(), this.send_text);
    this.pre_page = this.id_cate + '_' + this.id_parent;
    const next_page = this.data_cate[ind].id_catagory + '_' +
    this.data_cate[ind].parent_id + '_' + this.id_cate + '_' + this.id_parent;

    this.router.navigate(['admin/categoryManages/subcategory/', next_page]);


    setTimeout(() => {
      this.ngOnInit();
    }, 100);
   }

   on_editCategory(ind: any ) {
    // alert(ind);
     this.stat_name[ind] = false;
   }

   on_addCategory() {

    const dialogRef = this.dialog.open(AddcategoryDialogComponent, {
      width: '500px'
     });

     dialogRef.afterClosed().subscribe(result => {
      if (result.status === true && result.data !== '') {
        this.data_Category = this.fb.group({
          name_catagory: result.data,
          parent_id: this.parent_id
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

   on_addsubCategory(id_cate: any) {

    const dialogRef = this.dialog.open(AddcategoryDialogComponent, {
      width: '500px'
     });

     dialogRef.afterClosed().subscribe(result => {
      if (result.status === true && result.data !== '') {
        this.data_Category = this.fb.group({
          name_catagory: result.data,
          parent_id: id_cate
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

   on_confirm(id_type: any ,ind: any , txt: HTMLInputElement) {

    this.edit_Category = this.fb.group({
      id_catagory: id_type,
      name_catagory: txt.value,
      parent_id: this.data_cate[ind].parent_id
    });

    console.log('data=>', this.edit_Category.value);

    this.adminService.update_category(this.edit_Category.value).subscribe(
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
          this.adminService.get_subCategory(this.id_cate).subscribe(
            res=> {
              console.log('get=>', res['body']);
              if (res['body'].length === 0) {
                this.pre_page = this.pre_cate + '_' + this.pre_parent;
                this.router.navigate(['admin/categoryManages/subcategory/', this.pre_page]);
                setTimeout(() => {
                  this.ngOnInit();
                }, 100);
              }
            }
          );
          this.ngOnInit();
        }, err => {
          console.log('delete_category=>', err);
        }
      );
    }

   }


   on_backPage() {
    let page = parseInt(localStorage.getItem('c_pages'), 10) ;
    this.pre_page = localStorage.getItem(page.toString());
    page = page - 1;
    localStorage.setItem('c_pages', page.toString());

     if (page === -1) {
       localStorage.removeItem('c_pages');
      this.router.navigate(['admin/categoryManages']);
     } else {
        page = page + 1;
        localStorage.removeItem(page.toString());
        this.router.navigate(['admin/categoryManages/subcategory/', this.pre_page]);
     }
     setTimeout(() => {
      this.ngOnInit();
    }, 100);

   }

}
