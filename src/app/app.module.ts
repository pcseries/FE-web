import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule
  , MatButtonModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule
  , MatCheckboxModule
  , MatBadgeModule } from '@angular/material';

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
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [LoginComponent,
    loginDialog,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
