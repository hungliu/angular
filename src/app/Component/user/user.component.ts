import { Component, OnInit, Injectable, Input } from "@angular/core";
import { UserService } from "../../Services/UserService";
import { IUser } from "../../Interface/IUser";
import { Paging } from "../../Constant/Paging";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/Models/User";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: []
})
@Injectable()
export class UserComponent implements OnInit {
  @Input() hideButton: number;

  pageIndex: number = Paging.PageIndex;
  pageSize: number = Paging.PageSize;
  pageTotal: number;

  userList: IUser[];
  loading = true;
  showList = true;

  userAdded: number = 0;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    console.log(this.hideButton);
    this.loadData(this.pageIndex, this.pageSize);
  }

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
    this.userService.getListUserWithAdap(pageIndex, pageSize).subscribe(
      data => {
        this.userList = data;
        this.pageTotal = 100; //for test
        this.loading = false;

        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      err => {
        window.alert("not connect server-jon");
      }
    );
  }

  getEventFromAddUser($event) {
    if ($event.success == 1) {
      this.userAdded = $event.item;
      this.onReload();
    }
  }
}
