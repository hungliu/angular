import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {path: 'user-center', component: UserComponent  },
  {path: 'product-center', component: ProductComponent},
  {path: 'user/:id', component: UserComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    UserComponent,
    ProductComponent
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
