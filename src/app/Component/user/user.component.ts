import { Component, OnInit, Injectable, Input } from '@angular/core';
// import { ApiUrl } from '../Constant/ApiUrl';
import { UserService } from '../../Services/UserService';
import { IUser } from '../../Interface/IUser';
import { Paging } from '../../Constant/Paging';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable()
export class UserComponent implements OnInit {
  @Input() hideButton: number;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
  }

  pageIndex: number = Paging.PageIndex;
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
    this.loading = true;
    this.pageIndex = 1;
    this.pageSize = Paging.PageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  Navigate($event) {
    this.loadData($event, this.pageSize);
  }

  loadData(pageIndex: number, pageSize: number) {
    this.spinner.show();
    this.userService.getUserList(pageIndex, pageSize)
      .subscribe(
        data => {
          //  console.log(data);
          this.userList = data;
          this.pageTotal = 100;
          this.loading = false;
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }, err => {
          window.alert('not connect server-jon');
        });
  }

  userAdded;
  getEventFromAddUser($event) {
    if ($event.success == 1) {
      this.userAdded = $event.item;
      this.onReload();
    }
  }

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize);
  }
}



