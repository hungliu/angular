import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { TodoComponent } from "./Component/todo/todo.component";
import { UserComponent } from "./Component/user/user.component";

import { AddUserComponent } from "./Component/add-user/add-user.component";
import { SearchComponent } from "./Component/search/search.component";
import { HeaderComponent } from "./Component/header/header.component";
import { HomeComponent } from "./Component/home/home.component";
import { UserDetailComponent } from "./Component/user-detail/user-detail.component";

import { UserService } from "./Services/UserService";
import { RouteName } from "./Constant/RouteName";

import { NgxSpinnerModule } from "ngx-spinner";
import { UserlistComponent } from './Component/userlist/userlist.component';
import { RowHoverDirectiveDirective } from './directive/row-hover-directive.directive';

const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: RouteName.HOME, component: HomeComponent },
  { path: RouteName.SEARCH, component: SearchComponent },
  { path: RouteName.USER, component: UserComponent },
  { path: "user/:id", component: UserDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    UserComponent,
    SearchComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailComponent,
    AddUserComponent,
    UserlistComponent,
    RowHoverDirectiveDirective,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  // entryComponents: [AlertContentComponent]
})
export class AppModule { }
