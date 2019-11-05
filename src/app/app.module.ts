import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';


import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { UserService } from './Services/UserService';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search-route', component: SearchComponent},
  {path: 'user-route', component: UserComponent  },
  {path: 'product-route', component: ProductComponent},
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
    UserDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})


export class AppModule { }
