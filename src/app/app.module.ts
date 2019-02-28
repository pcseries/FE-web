import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule
  , MatButtonModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule
  , MatCheckboxModule
  , MatBadgeModule
   , MatNativeDateModule
  } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';


import { ReactiveFormsModule } from '@angular/forms';
import { MainLoginComponent } from './main-login/main-login.component';
import { MADOComponent } from './mado/mado.component';
import { RegisterComponent } from './register/register.component';
import { SubnavComponent } from './subnav/subnav.component';


import { GlobalService } from './services/global.service';
import { SidebarComponent } from './user/shared/layouts/sidebar/sidebar.component';
import { MenuComponent } from './user/shared/layouts/menu/menu.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { PagesTopComponent } from './user/shared/layouts/pages-top/pages-top.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {  UserMNcomponent } from './admin/pages/userMN/user-mn.component';
import { SidebarAdminComponent } from './admin/shared/layouts/sidebar-admin/sidebar-admin';
import { MattabledataComponent } from './admin/pages/userMN/mattabledata/mattabledata.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminMNComponent } from './admin/pages/admin-mn/admin-mn.component';
import { TableAdminComponent } from './admin/pages/admin-mn/table-admin/table-admin.component';
import { AddAdminComponent } from './admin/pages/admin-mn/add-admin/add-admin.component';
import { OpenStoreComponent } from './store/open-store/open-store.component';
import { MyDialogComponent } from './store/open-store/my-dialog/my-dialog.component';
import { InfoComponent } from './admin/pages/admin-mn//info/info.component';
import { ProductsComponent } from './core/shared/allProduct/products/products.component';

import { EditAdminComponent } from './admin/pages/admin-mn/edit-admin/edit-admin.component';
import { DtailProductComponent } from './core/pages/dtail-product/dtail-product.component';
import { CardProductComponent } from './core/shared/card-product/card-product.component';
import { RecommendComponent } from './core/shared/allProduct/recommend/recommend.component';
import { NewProductComponent } from './core/shared/allProduct/new-product/new-product.component';
import { EditUserComponent } from './user/pages/edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { PromotionProductComponent } from './core/pages/promotion-product/promotion-product.component';
import { AdminPageComponent } from './admin/admin-page.component';

import { ProfileAdminComponent } from './admin/pages/profile-admin/profile-admin.component';
import { ListProductComponent } from './core/shared/list-product/list-product.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCartsComponent } from './core/pages/shopping-carts/shopping-carts.component';
import { UserStoreComponent } from './user/pages/user-store/user-store.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SeeProductsComponent } from './see-products/see-products.component';
import { AddProductStoreComponent } from './user/pages/user-store/add-product-store/add-product-store.component';
import { ListProductsStoreComponent } from './user/pages/user-store/list-products-store/list-products-store.component';
import { StoreManageComponent } from './user/pages/user-store/store-manage/store-manage.component';
import { StoreManageVariationComponent } from './user/pages/user-store/store-manage-variation/store-manage-variation.component';
import { AddImageProductComponent } from './user/pages/user-store/add-image-product/add-image-product.component';
import { ManageDtailComponent } from './user/pages/user-store/store-manage/manage-dtail/manage-dtail.component';

import { UiSwitchModule } from 'ngx-toggle-switch';
import { AddAdressComponent } from './core/pages/add-adress/add-adress.component';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,

    MainLoginComponent,
    MADOComponent,
    RegisterComponent,
    SubnavComponent,
    SidebarComponent,
    MenuComponent,
    ProfileComponent,
    PagesTopComponent,
    UserMNcomponent,
    SidebarAdminComponent,
    MattabledataComponent,
    AdminMNComponent,
    TableAdminComponent,
    AddAdminComponent,
    OpenStoreComponent,
    MyDialogComponent,
    InfoComponent,
    ProductsComponent,

    EditAdminComponent,
    DtailProductComponent,
    CardProductComponent,
    RecommendComponent,
    NewProductComponent,
    EditUserComponent,
    UserComponent,
    PromotionProductComponent,
    AdminPageComponent,
    ProfileAdminComponent,
    ListProductComponent,
    ShoppingCartsComponent,
    UserStoreComponent,
    SeeProductsComponent,
    AddProductStoreComponent,
    ListProductsStoreComponent,
    StoreManageComponent,
    StoreManageVariationComponent,
    AddImageProductComponent,
    ManageDtailComponent,
    AddAdressComponent

  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    UiSwitchModule

  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [
    GlobalService,
    CookieService,
    {provide: LocationStrategy,
     useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

