import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {

  send_text: any;

  id_forpd: any;
  id_forcategory: any;

  status_num = [];
  products = [];

  isImageLoading: boolean;
  price = [];
  imageToShow: any = [];
  category_show: any;
  is_empty: any;
  show_category: any;

  path: any;
  pre_page: any;

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.path = localStorage.getItem('path');
    this.is_empty = false;
    this.isImageLoading = false;
    this.show_category = true;
    this.send_text = this.route.snapshot.paramMap.get('txt');
    this.status_num = this.send_text.split("_");

    this.id_forpd = parseInt(this.status_num[0] , 10);
    this.id_forcategory = parseInt(this.status_num[0] , 10);

    this.get_Prdoduct(this.id_forpd);
    this.get_category(this.id_forcategory);
  }

  get_Prdoduct(id: any) {
    this.productsService.get_productsSubcate(id).subscribe(
      res => {
        console.log('products=>', res['body']);
        this.products = res['body'];

        if (this.products.length === 0) {
          this.is_empty = true;
        }

        for (let i = 0; i < this.products.length; i++) {
          this.getImageFromService(this.products[i].id_product, this.products[i].pic[0].pic_product, i);
          this.price[i] = this.products[i]['variation'][0].price;
        }
      }, err => {
        console.log('products=>', err);
      }
    );
  }

  get_category(id: any) {
    this.adminService.get_subCategory(id).subscribe(
      res => {
        console.log('subCategory=>', res['body']);
        this.category_show = res['body'];

        if (this.category_show.length === 0) {
          this.show_category = false;
        }
      }, err => {
        console.log('subCategory=>', err);
      }
    );
  }

  getImageFromService(id: any , name: any, i: any) {
    this.isImageLoading = true;
    this.productsService.getImage(id, name).subscribe(
      data => {
        this.createImageFromBlob(data, i);
        this.isImageLoading = false;
      }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, i: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow[i] = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }


 seeProduct(idProduct) {
  //alert(idProduct);
  this.router.navigate(['mado/product/detail', idProduct]);
}

search_category(ind: any) {

  console.log('name_category=>', this.category_show[ind].name_catagory);
  let path =  localStorage.getItem('path');
    path = path + this.category_show[ind].name_catagory + '>';
    localStorage.setItem('path', path);
    let page = parseInt(localStorage.getItem('c_pages'), 10) ;
    page = page + 1;
    localStorage.setItem('c_pages', page.toString());

    localStorage.setItem(page.toString(), this.send_text);
  const txt = this.category_show[ind].id_catagory + '_' + this.category_show[ind].parent_id;
   this.router.navigate(['mado/category/', txt]);


   setTimeout(() => {
     this.ngOnInit();
  }, 200);
}

on_backPage() {

  let path = localStorage.getItem('path');
    let pre_path = path.split('>');
    let ind_delete = pre_path.length - 2;
    pre_path.splice(ind_delete, 1);
    console.log('prepath->', pre_path);

    let txtpath = '';
    for (let i = 0; i < pre_path.length-1; i++) {
      txtpath = txtpath + pre_path[i] + '>';
    }
    localStorage.setItem('path', txtpath);
    let page = parseInt(localStorage.getItem('c_pages'), 10) ;
    this.pre_page = localStorage.getItem(page.toString());
    page = page - 1;
    localStorage.setItem('c_pages', page.toString());

    if (page === -1) {
      localStorage.removeItem('c_pages');
      localStorage.removeItem('path');
     this.router.navigate(['mado/listproduct']);
    } else {
       page = page + 1;
       localStorage.removeItem(page.toString());
       this.router.navigate(['mado/category/', this.pre_page]);
    }
    setTimeout(() => {
     this.ngOnInit();
   }, 100);
}

}
