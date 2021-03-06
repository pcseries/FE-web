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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
import { PagesComponent } from './core/pages/pages.component';
import { CheckOutComponent } from './core/pages/check-out/check-out.component';
import { EditStoreComponent } from './user/pages/user-store/edit-store/edit-store.component';
import { MyShippingComponent } from './core/pages/check-out/my-shipping/my-shipping.component';
import { PayProductsComponent } from './core/pages/pay-products/pay-products.component';
import { PayHistoryComponent } from './user/pages/pay-history/pay-history.component';
import { MyPayingComponent } from './core/pages/check-out/my-paying/my-paying.component';
import { OrderedHistoryComponent } from './user/pages/pay-history/ordered-history/ordered-history.component';
import { CanceledHistoryComponent } from './user/pages/pay-history/canceled-history/canceled-history.component';
import { AddressManageComponent } from './user/pages/address-manage/address-manage.component';
import { UseraddAddressComponent } from './user/pages/address-manage/useradd-address/useradd-address.component';
import { UsereditAddressComponent } from './user/pages/address-manage/useredit-address/useredit-address.component';
import { DeliveryProductsComponent } from './user/pages/pay-history/delivery-products/delivery-products.component';
import { SellProductsComponent } from './user/pages/sell-products/sell-products.component';
import { TrackingProductComponent } from './user/pages/pay-history/delivery-products/tracking-product/tracking-product.component';
import { SellOrderedComponent } from './user/pages/sell-products/sell-ordered/sell-ordered.component';
import { DtailOrderedComponent } from './user/pages/sell-products/sell-ordered/dtail-ordered/dtail-ordered.component';
import { PrecompleteHistoryComponent } from './user/pages/pay-history/precomplete-history/precomplete-history.component';
import { CompleteHistoryComponent } from './user/pages/pay-history/complete-history/complete-history.component';
import { RejectedHistoryComponent } from './user/pages/pay-history/rejected-history/rejected-history.component';
import { AddShippingComponent } from './user/pages/user-store/add-shipping/add-shipping.component';
import { CreateShipComponent } from './user/pages/sell-products/sell-ordered/dtail-ordered/create-ship/create-ship.component';
import { DtailPayHistoryComponent } from './user/pages/pay-history/dtail-pay-history/dtail-pay-history.component';
import { DtailAddressComponent } from './user/pages/sell-products/dtail-address/dtail-address.component';
import { DtailSellproductComponent } from './user/pages/sell-products/dtail-sellproduct/dtail-sellproduct.component';
import { HistoryPetComponent } from './history-pet/history-pet.component';
import { SelledProductsComponent } from './user/pages/sell-products/selled-products/selled-products.component';
import { DeliveredProductsComponent } from './user/pages/sell-products/delivered-products/delivered-products.component';
import { CompleteSellproductsComponent } from './user/pages/sell-products/complete-sellproducts/complete-sellproducts.component';
import { CanceledSellproductsComponent } from './user/pages/sell-products/canceled-sellproducts/canceled-sellproducts.component';
import { RejectedSellproductsComponent } from './user/pages/sell-products/rejected-sellproducts/rejected-sellproducts.component';
import { AcceptRejectedComponent } from './user/pages/sell-products/rejected-sellproducts/accept-rejected/accept-rejected.component';
import { DecideOrdersComponent } from './admin/pages/decide-orders/decide-orders.component';
import { WaitmoneyHistoryComponent } from './user/pages/pay-history/waitmoney-history/waitmoney-history.component';
import { RefundProductsComponent } from './user/pages/sell-products/refund-products/refund-products.component';
import { ManageDecideComponent } from './admin/pages/decide-orders/manage-decide/manage-decide.component';
import { DecideProductComponent } from './admin/pages/decide-orders/manage-decide/decide-product/decide-product.component';
import { DtailDecideProductComponent } from './admin/pages/decide-orders/manage-decide/dtail-decide-product/dtail-decide-product.component';
import { AddRejectCommentComponent } from './user/pages/pay-history/add-reject-comment/add-reject-comment.component';
import { ShippingManageComponent } from './admin/pages/shipping-manage/shipping-manage.component';
import { AddshipDialogComponent } from './admin/pages/shipping-manage/addship-dialog/addship-dialog.component';
import { CategoryManageComponent } from './admin/pages/category-manage/category-manage.component';
import { PayingManageComponent } from './admin/pages/paying-manage/paying-manage.component';
import { AddpayDialogComponent } from './admin/pages/paying-manage/addpay-dialog/addpay-dialog.component';
import { AddcategoryDialogComponent } from './admin/pages/category-manage/addcategory-dialog/addcategory-dialog.component';
import { CommentRejectedComponent } from './user/pages/pay-history/comment-rejected/comment-rejected.component';
import { SubCategoryComponent } from './admin/pages/category-manage/sub-category/sub-category.component';
import { ScoreDialogComponent } from './user/pages/pay-history/complete-history/score-dialog/score-dialog.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommentsProductComponent } from './core/pages/comments-product/comments-product.component';
import { SearchProductsComponent } from './core/pages/search-products/search-products.component';
import { ShopDtailComponent } from './core/pages/shop-dtail/shop-dtail.component';
import { CategoryGroupComponent } from './core/pages/category-group/category-group.component';
import { BusinessMnComponent } from './admin/pages/business-mn/business-mn.component';
import { AccountMnComponent } from './admin/pages/account-mn/account-mn.component';


// ngx-bootstrap
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchCategoryComponent } from './core/pages/search-category/search-category.component';
import { ScoreShowComponent } from './user/pages/pay-history/complete-history/score-show/score-show.component';
import { PromotionMNComponent } from './user/pages/user-store/store-manage-variation/promotion-mn/promotion-mn.component';
import { ProductBestsellerComponent } from './core/pages/product-bestseller/product-bestseller.component';
import { PackageMnComponent } from './admin/pages/package-mn/package-mn.component';
import { AddpackageDialogComponent } from './admin/pages/package-mn/addpackage-dialog/addpackage-dialog.component';
import { SearchBestsellerComponent } from './core/pages/search-bestseller/search-bestseller.component';
import { BuyPackageComponent } from './user/pages/user-store/store-manage/buy-package/buy-package.component';
import { PayPackageComponent } from './user/pages/user-store/store-manage/pay-package/pay-package.component';
import { RecommendProductsComponent } from './core/pages/recommend-products/recommend-products.component';
import { AllProductsComponent } from './core/pages/all-products/all-products.component';
import { AllPromoComponent } from './core/pages/all-promo/all-promo.component';
import { AllRecommendComponent } from './core/pages/all-recommend/all-recommend.component';
import { SetScoreComponent } from './user/pages/pay-history/complete-history/set-score/set-score.component';
import {MatCardModule} from '@angular/material/card';
import { DtailAccountComponent } from './admin/pages/account-mn/dtail-account/dtail-account.component';



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
    AddAdressComponent,
    PagesComponent,
    CheckOutComponent,
    EditStoreComponent,
    MyShippingComponent,
    PayProductsComponent,
    PayHistoryComponent,
    MyPayingComponent,
    OrderedHistoryComponent,
    CanceledHistoryComponent,
    AddressManageComponent,
    UseraddAddressComponent,
    UsereditAddressComponent,
    DeliveryProductsComponent,
    SellProductsComponent,
    TrackingProductComponent,
    SellOrderedComponent,
    DtailOrderedComponent,
    PrecompleteHistoryComponent,
    CompleteHistoryComponent,
    RejectedHistoryComponent,
    AddShippingComponent,
    CreateShipComponent,
    DtailPayHistoryComponent,
    DtailAddressComponent,
    DtailSellproductComponent,
    HistoryPetComponent,
    SelledProductsComponent,
    DeliveredProductsComponent,
    CompleteSellproductsComponent,
    CanceledSellproductsComponent,
    RejectedSellproductsComponent,
    AcceptRejectedComponent,
    DecideOrdersComponent,
    WaitmoneyHistoryComponent,
    RefundProductsComponent,
    ManageDecideComponent,
    DecideProductComponent,
    DtailDecideProductComponent,
    AddRejectCommentComponent,
    ShippingManageComponent,
    AddshipDialogComponent,
    CategoryManageComponent,
    PayingManageComponent,
    AddpayDialogComponent,
    AddcategoryDialogComponent,
    CommentRejectedComponent,
    SubCategoryComponent,
    ScoreDialogComponent,
    CommentsProductComponent,
    SearchProductsComponent,
    ShopDtailComponent,
    CategoryGroupComponent,
    BusinessMnComponent,
    AccountMnComponent,

    SearchCategoryComponent,
    ScoreShowComponent,
    PromotionMNComponent,
    ProductBestsellerComponent,
    PackageMnComponent,
    AddpackageDialogComponent,
    SearchBestsellerComponent,
    BuyPackageComponent,
    PayPackageComponent,
    RecommendProductsComponent,
    AllProductsComponent,
    AllPromoComponent,
    AllRecommendComponent,
    SetScoreComponent,
    DtailAccountComponent,


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
    UiSwitchModule,
    NgbModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule


  ],
  entryComponents: [
    MyDialogComponent,
    MyShippingComponent,
    MyPayingComponent,
    AddshipDialogComponent,
    AddpayDialogComponent,
    AddcategoryDialogComponent,
    ScoreDialogComponent,
    AddpackageDialogComponent

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

