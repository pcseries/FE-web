import { NgModule, Component } from '@angular/core';
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
import { CheckOutComponent } from './core/pages/check-out/check-out.component';
import { EditStoreComponent } from './user/pages/user-store/edit-store/edit-store.component';
import { PayProductsComponent } from './core/pages/pay-products/pay-products.component';
import { PayHistoryComponent } from './user/pages/pay-history/pay-history.component';
import { AddressManageComponent } from './user/pages/address-manage/address-manage.component';
import { UseraddAddressComponent } from './user/pages/address-manage/useradd-address/useradd-address.component';
import { UsereditAddressComponent } from './user/pages/address-manage/useredit-address/useredit-address.component';
import { SellProductsComponent } from './user/pages/sell-products/sell-products.component';
import { TrackingProductComponent } from './user/pages/pay-history/delivery-products/tracking-product/tracking-product.component';
import { DtailOrderedComponent } from './user/pages/sell-products/sell-ordered/dtail-ordered/dtail-ordered.component';
import { DtailPayHistoryComponent } from './user/pages/pay-history/dtail-pay-history/dtail-pay-history.component';
import { HistoryPetComponent } from './history-pet/history-pet.component';
import { DecideOrdersComponent } from './admin/pages/decide-orders/decide-orders.component';
import { ManageDecideComponent } from './admin/pages/decide-orders/manage-decide/manage-decide.component';
import { AddRejectCommentComponent } from './user/pages/pay-history/add-reject-comment/add-reject-comment.component';
import { ShippingManageComponent } from './admin/pages/shipping-manage/shipping-manage.component';
import { CategoryManageComponent } from './admin/pages/category-manage/category-manage.component';
import { PayingManageComponent } from './admin/pages/paying-manage/paying-manage.component';
import { SubCategoryComponent } from './admin/pages/category-manage/sub-category/sub-category.component';
import { SearchProductsComponent } from './core/pages/search-products/search-products.component';
import { ShopDtailComponent } from './core/pages/shop-dtail/shop-dtail.component';
import { AccountMnComponent } from './admin/pages/account-mn/account-mn.component';
import { BusinessMnComponent } from './admin/pages/business-mn/business-mn.component';

import { SearchCategoryComponent } from './core/pages/search-category/search-category.component';
import { PromotionMNComponent } from './user/pages/user-store/store-manage-variation/promotion-mn/promotion-mn.component';
import { PackageMnComponent } from './admin/pages/package-mn/package-mn.component';
import { SearchBestsellerComponent } from './core/pages/search-bestseller/search-bestseller.component';
import { BuyPackageComponent } from './user/pages/user-store/store-manage/buy-package/buy-package.component';
import { PayPackageComponent } from './user/pages/user-store/store-manage/pay-package/pay-package.component';
import { AllProductsComponent } from './core/pages/all-products/all-products.component';
import { AllPromoComponent } from './core/pages/all-promo/all-promo.component';
import { AllRecommendComponent } from './core/pages/all-recommend/all-recommend.component';
import { SetScoreComponent } from './user/pages/pay-history/complete-history/set-score/set-score.component';
import { DtailAccountComponent } from './admin/pages/account-mn/dtail-account/dtail-account.component';




const routes: Routes = [
  {path: '', redirectTo: '/mado/listproduct', pathMatch: 'full'},
  {path: 'searchProducts/:cm', component: SearchProductsComponent},
  {path: 'main-nav', component: MainNavComponent},
  {
    path: 'mado', component: MADOComponent,
    children: [
      {path: 'listproduct', component: ListProductComponent},
      {path: 'login', component: MainLoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'product/detail/:id', component: DtailProductComponent},
      {path: 'shopping/:id', component: ShoppingCartsComponent},
      {path: 'addAdress', component: AddAdressComponent},
      {path: 'checkOut', component: CheckOutComponent},
      {path: 'payorder/:id', component: PayProductsComponent},
      {path: 'seeShop/:id', component: ShopDtailComponent},
      {path: 'category/:txt', component: SearchCategoryComponent},
      {path: 'searchbestseller/:id', component: SearchBestsellerComponent},
      {path: 'manageAddress' , component: AddressManageComponent},
      {path: 'manageAddress/add' , component: UseraddAddressComponent},
      {path: 'manageAddress/editAddress/:id' , component: UsereditAddressComponent},
      {path: 'allProducts' , component: AllProductsComponent},
      {path: 'allPromo', component: AllPromoComponent},
      {path: 'allrecommend', component: AllRecommendComponent}
    ]
  },

  {
    path: 'admin', component: AdminPageComponent,
    children: [
      {path: 'userMN' , component: UserMNcomponent},
      {path: 'adminMN', component: AdminMNComponent},
      {path: 'profile', component: ProfileAdminComponent},
      {path: 'business/decideOrders', component: DecideOrdersComponent},
      {path: 'business/decideOrders/:id', component: ManageDecideComponent},
      {path: 'shippingManages', component: ShippingManageComponent},
      {path: 'categoryManages', component: CategoryManageComponent},
      {path: 'payingManages' ,  component: PayingManageComponent},
      {path: 'categoryManages/subcategory/:id', component: SubCategoryComponent},
      {path: 'business/accountManages', component: AccountMnComponent},
      {path: 'business/accountDtail', component: DtailAccountComponent},
      {path: 'business/businessManages', component: BusinessMnComponent},
      {path: 'business/packageManages' , component: PackageMnComponent}
    ],
  },
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'editProfile', component: EditUserComponent},
      {path: 'store', component: UserStoreComponent},
      {path: 'store/manageStore/:id', component: StoreManageComponent} ,
      {path: 'addImage/:id', component: AddImageProductComponent},
      {path: 'store/edit', component: EditStoreComponent},
      {path: 'payHistory/:id', component: PayHistoryComponent},
      {path: 'payHistory', component: PayHistoryComponent},
      {path: 'payHistory/dtail/:id', component: DtailPayHistoryComponent},
      {path: 'addressManage', component: AddressManageComponent},
      {path: 'addressManage/addAddress', component: UseraddAddressComponent},
      {path: 'addressManage/editAddress/:id', component: UsereditAddressComponent},
      {path: 'sellProducts', component: SellProductsComponent},
      {path: 'sellProducts/:id', component: SellProductsComponent},
      {path: 'payHistory/tracking/:id', component: TrackingProductComponent},
      {path: 'sellProducts/manage-ordered/:id', component: DtailOrderedComponent},
      {path: 'payHistory/addComment/:id', component: AddRejectCommentComponent},
      {path: 'store/promotion/:id', component: PromotionMNComponent},
      {path: 'store/buyPackage/:id', component: BuyPackageComponent},
      {path: 'store/payPackage/:id', component: PayPackageComponent},
      {path: 'payHistory/setScore/:id', component: SetScoreComponent}
    ],
  },
  {
    path: 'history/pet' , component: HistoryPetComponent
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
