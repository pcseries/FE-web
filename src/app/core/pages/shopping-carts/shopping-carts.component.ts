import { Component, OnInit } from "@angular/core";
import { ShopcartService } from "src/app/services/core/shopcart.service";
import { ProductsService } from "src/app/services/core/products.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-shopping-carts",
  templateUrl: "./shopping-carts.component.html",
  styleUrls: ["./shopping-carts.component.css"],
  providers: [ShopcartService, ProductsService]
})
export class ShoppingCartsComponent implements OnInit {
  shopCart = [];
  selectProduct = [];
  count: any;
  progress = false;
  shop = [];
  name: any;
  id_order: any;

  isHaveProduct: boolean;
  isImageLoading: boolean;
  imageToShow: any = [];
  deleteProduct: FormGroup;

  // แสดงรายการสินค้า
  showOrders = [];
  sort_showOrder = [];
  status_header = [];

  constructor(
    private shopcartService: ShopcartService,
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token") === null) {
      alert("Please Login");
      this.router.navigate(["/mado/login"]);
    }
    this.count = 0;
    this.isHaveProduct = true;
    this.shopcartService.getOrder().subscribe(
      res => {
        this.shopCart = res["body"]["order"];
        // this.name = res['body']['order'][1]['order_item'][0].name_product;
        // console.log("shopCart", res["body"]["order"]);
        // this.showOrders = res['body']['order'];
       // this.onShoworders(res['body']['order']);

        // คัดสินค้า ที่นี้
        for (let i = 0; i < this.shopCart.length; i++) {
          if (this.shopCart[i].order_status === "ORDERING") {
            this.id_order = this.shopCart[i].id_order;
            this.count = this.count + 1;
            this.isHaveProduct = true;
            // console.log(this.shopCart[i]);
            // this.selectProduct[this.count] = this.shopCart[i].order_item;
            // this.getImageFromService(this.selectProduct[this.count][this.count].id_product , this.selectProduct[this.count][this.count].pic_product);
           // this.onShoworders(this.shopCart[i]["order_item"]);

            this.onShoworders(this.shopCart[i]["order_item"]);

            // console.log('productSelect', this.shopCart[i]['order_item'][0]);
            for (let j = 0; j < this.shopCart[i]["order_item"].length; j++) {
              this.selectProduct = this.shopCart[i]["order_item"];
                // this.showOrders.push(this.selectProduct[j]);
               // this.onShoworders(this.shopCart[i]["order_item"]);
            // console.log('selectProduct', this.selectProduct[j]);
              console.log("LengthProduct", this.selectProduct.length);
              let id = this.shopCart[i]["order_item"][j].id_product;
              let namepic = this.shopCart[i]["order_item"][j].pic_product;
              this.getImageFromService(id, namepic, j);
            }
            if (this.shopCart[i]["order_item"].length === 0) {
              this.count = 0;
            }
          }
          // console.log('selectedProduct', this.selectProduct);
        }
        console.log("count", this.count);
        if (this.count === 0) {
          this.isHaveProduct = false;
        }

        // console.log('length', this.shopCart.length);
        // console.log('name', res['body']['order'][1]['order_item'][0].name_product);
        this.progress = true;

      },
      error => {
        console.log("err", error);
      }
    );

  }

  onShoworders (showOrders: any) {
    console.log('showOrders', showOrders);
    // sort ตาม id ร้าน ** id_shop
    // this.showOrders.sort((a, b) => a.id_shop.localeCompare(b.id_shop));
    let swap = [];
    for (let i = 0; i < showOrders.length - 1 ; i++) {
      for (let j = 0; j < showOrders.length - i - 1 ; j++ ) {
         //console.log('access');
        if (showOrders[j].id_shop > showOrders[j + 1].id_shop) {
          swap = showOrders[j];
          showOrders[j] = showOrders[j + 1];
          showOrders[j + 1] = swap;
        }
      }
    }
     console.log('sortOrder', showOrders);
     this.status_header[0] = true;
     for (let i = 1; i < showOrders.length; i++) {
      if (showOrders[i-1].id_shop === showOrders[i].id_shop) {
        this.status_header[i] = false;
      } else {
        this.status_header[i] = true;
      }

     }

  }

  getImageFromService(id: any, namePic: any, j: any) {
    this.isImageLoading = true;
    this.productService.getImage(id, namePic).subscribe(
      data => {
        this.createImageFromBlob(data, j);
        this.isImageLoading = false;
      },
      error => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob, j: any) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow[j] = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onDeleteProduct(item: any) {
    let c = confirm("Are you sure delete");
   // console.log('id_order', this.id_order);
   // alert(this.id_order);
    if (c == true) {
      this.deleteProduct = this.fb.group({
        body: [
          {
            id_order: [this.id_order],
            id_item: [item]
          }
        ]
      });
      // console.log('delete', this.deleteProduct.value);
     // alert(item);
     console.log('product_delete', this.deleteProduct.value);
      this.shopcartService.deleteProduct(this.deleteProduct.value).subscribe(
        res => {
          console.log("res", res);
          location.reload();
        },
        error => {
          console.log("error", error);
        }
      );

    }

  }

  onAddProduct() {

  }
}
