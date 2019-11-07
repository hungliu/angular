import { Component, OnInit, Injectable, Input } from '@angular/core';
// import { ApiUrl } from '../Constant/ApiUrl';
import { UserService } from '../Services/UserService';
import {IUser} from '../Interface/IUser';
import { Paging } from '../Constant/Paging';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable()
export class UserComponent implements OnInit {
  @Input() hideButton: number;
  constructor(private userService: UserService) {
  }

  pageIndex: number = Paging.PageIndex ;
  pageSize: number = Paging.PageSize;
  pageTotal: number;

  userList: IUser[];
  loading = true;
  showList = true;

  onAddNew() {
    this.loading = false;
    this.showList = false;
  }

  onReload() {
    this.showList = true;
    this.loading = true ;
    this.pageIndex = 1;
    this.pageSize = Paging.PageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  Navigate($event) {
    this.loadData($event, this.pageSize);
  }

  loadData(pageIndex: number, pageSize: number) {
    this.userService.getUserList(pageIndex, pageSize)
    .subscribe( data => {
     //  console.log(data);
       this.userList = data;
       this.pageTotal = 100;
       this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize);
  }
}



