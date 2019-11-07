import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { UserService } from './Services/UserService';
import { RouteName } from "./Constant/RouteName";

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: RouteName.HOME, component: HomeComponent},
  {path: RouteName.SEARCH, component: SearchComponent},
  {path: RouteName.USER, component: UserComponent  },
  {path: RouteName.PRODUCT, component: ProductComponent},
  {path: 'user/:id', component: UserDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    UserComponent,
    ProductComponent,
    SearchComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailComponent,
    AddUserComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})


export class AppModule { }
