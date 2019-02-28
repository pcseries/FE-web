import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './main-login/main-login.component';
import { MADOComponent } from './mado/mado.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { UserMNcomponent } from './admin/pages/userMN/user-mn.component';
import { AdminMNComponent } from './admin/pages/admin-mn/admin-mn.component';
import { DtailProductComponent } from './core/pages/dtail-product/dtail-product.component';
import { EditUserComponent } from './user/pages/edit-user/edit-user.component';

import { AdminPageComponent } from './admin/admin-page.component';
import { UserComponent } from './user/user.component';
import { ProfileAdminComponent } from './admin/pages/profile-admin/profile-admin.component';
import { ListProductComponent } from './core/shared/list-product/list-product.component';
import { ShoppingCartsComponent } from './core/pages/shopping-carts/shopping-carts.component';
import { UserStoreComponent } from './user/pages/user-store/user-store.component';
import { StoreManageComponent } from './user/pages/user-store/store-manage/store-manage.component';
import { AddImageProductComponent } from './user/pages/user-store/add-image-product/add-image-product.component';
import { AddAdressComponent } from './core/pages/add-adress/add-adress.component';



const routes: Routes = [
  {path: '', redirectTo: '/mado/listproduct', pathMatch: 'full'},
  {path: 'main-nav', component: MainNavComponent},
  {
    path: 'mado', component: MADOComponent,
    children: [
      {path: 'listproduct', component: ListProductComponent},
      {path: 'login', component: MainLoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'product/detail/:id', component: DtailProductComponent},
      {path: 'shopping', component: ShoppingCartsComponent},
      {path: 'addAdress', component: AddAdressComponent}
    ]
  },

  {
    path: 'admin', component: AdminPageComponent,
    children: [
      {path: 'userMN' , component: UserMNcomponent},
      {path: 'adminMN', component: AdminMNComponent},
      {path: 'profile', component: ProfileAdminComponent}
    ],
  },
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'editProfile', component: EditUserComponent},
      {path: 'store', component: UserStoreComponent},
      {path: 'manageStore/:id', component: StoreManageComponent} ,
      {path: 'addImage/:id', component: AddImageProductComponent}
    ],
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
