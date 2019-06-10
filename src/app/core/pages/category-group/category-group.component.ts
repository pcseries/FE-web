import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.css']
})
export class CategoryGroupComponent implements OnInit {

  category_show: any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.get_category().subscribe(
      res => {
        console.log('category=>', res['body']);
        this.category_show = res['body'];
      }, err => {
        console.log('category=>', err);
      }
    );
  }

  search_category(ind: any) {
    console.log('name_category=>', this.category_show[ind].name_catagory);
    const txt = this.category_show[ind].id_catagory + '_' + this.category_show[ind].parent_id;
    localStorage.setItem('c_pages', '0');
    localStorage.setItem('path', this.category_show[ind].name_catagory + '>');
     this.router.navigate(['mado/category/', txt]);
  }

}
