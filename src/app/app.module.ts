import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './Component/todo/todo.component';
import { UserComponent } from './Component/user/user.component';

import { AddUserComponent } from './Component/add-user/add-user.component';
import { SearchComponent } from './Component/search/search.component';
import { HeaderComponent } from './Component/header/header.component';
import { HomeComponent } from './Component/home/home.component';
import { UserDetailComponent } from './Component/user-detail/user-detail.component';
import { PageNotFoundComponent } from './Component/page-not-found/page-not-found.component';


import { UserService } from './Services/UserService';
import { LoadingServie } from './Services/LoadingService';
import { RouteName } from './Constant/RouteName';

import { NgxSpinnerModule } from 'ngx-spinner';
import { UserlistComponent } from './Component/userlist/userlist.component';
import { RowHoverDirectiveDirective } from './directive/row-hover-directive.directive';
import { SexPipePipe } from './Pipes/sex-pipe.pipe';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserListV2Component } from './Component/user-list-v2/user-list-v2.component';

import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupModule } from '@progress/kendo-angular-popup';

const appRoutes: Routes = [
  { path: '', redirectTo: RouteName.KENDOGRID_USER, pathMatch: 'full' },
  { path: RouteName.HOME, component: HomeComponent },
  { path: RouteName.SEARCH, component: SearchComponent },
  { path: RouteName.USER, component: UserComponent },
  { path: RouteName.KENDOGRID_USER, component: UserListV2Component },
  { path: 'user/:id', component: UserDetailComponent }
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
    SexPipePipe,
    UserListV2Component,
    PageNotFoundComponent,
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
    FormsModule,
    InputsModule,
    GridModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    PopupModule
  ],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatTabsModule],
  providers: [UserService, LoadingServie],
  bootstrap: [AppComponent],
  // entryComponents: [AlertContentComponent]
})
export class AppModule { }
