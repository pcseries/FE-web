import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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


import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';

import { LoginComponent, loginDialog } from './login/login.component';
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
import { ImageComponent } from './image/image.component';
import { EditAdminComponent } from './admin/pages/admin-mn/edit-admin/edit-admin.component';
import { DtailProductComponent } from './core/pages/dtail-product/dtail-product.component';
import { CardProductComponent } from './core/shared/card-product/card-product.component';
import { RecommendComponent } from './core/shared/allProduct/recommend/recommend.component';
import { NewProductComponent } from './core/shared/allProduct/new-product/new-product.component';
import { EditUserComponent } from './user/pages/edit-user/edit-user.component';
import { UserComponent } from './user/user.component';






@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    loginDialog,
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
    ImageComponent,
    EditAdminComponent,
    DtailProductComponent,
    CardProductComponent,
    RecommendComponent,
    NewProductComponent,
    EditUserComponent,
    UserComponent
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
    MatPaginatorModule

  ],
  entryComponents: [LoginComponent,
    loginDialog,
    MyDialogComponent
  ],
  providers: [
    GlobalService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

