import { Component, OnInit, Injectable, Input } from "@angular/core";
import { UserService } from "../../Services/UserService";
import { IUser } from "../../Interface/IUser";
import { Paging } from "../../Constant/Paging";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/Models/User";
@Injectable()
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: []
})
export class UserlistComponent implements OnInit {
  pageIndex: number = Paging.PageIndex;
  pageSize: number = Paging.PageSize;
  pageTotal: number = 100;
  userList: IUser[];

  @Input() readyLoad: number;
  @Input() userListFromParent: IUser[];

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.readyLoad == 1) {
      this.loadData(this.pageIndex, this.pageSize);
    }
  }

  ngOnChanges() {
    this.spinner.show();
    this.userList = this.userListFromParent;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Navigate($event) {
    this.loadData($event, this.pageSize);
  }

  loadData(pageIndex: number, pageSize: number) {
    this.spinner.show();

    this.userService.getListUserWithAdap(pageIndex, pageSize).subscribe(
      data => {
        this.userList = data;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      err => {
        window.alert('not connect server-jon');
      }
    );
  }
}
