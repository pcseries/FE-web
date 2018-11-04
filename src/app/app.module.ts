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
import { TestCNComponent } from './test-cn/test-cn.component';

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
    TestCNComponent,
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
  ],
  providers: [
    GlobalService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

