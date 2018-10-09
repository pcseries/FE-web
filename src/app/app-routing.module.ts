import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { MADOComponent } from './mado/mado.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/mado', pathMatch: 'full'},
  {path: 'main-nav', component: MainNavComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main-login', component: MainLoginComponent},
  {path: 'mado', component: MADOComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
