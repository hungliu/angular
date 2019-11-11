import { Component, OnInit, Injectable, Input } from "@angular/core";
import { UserService } from "../../Services/UserService";
import { IUser } from "../../Interface/IUser";
import { Paging } from "../../Constant/Paging";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/Models/User";
import { map, switchMap } from "rxjs/operators";
import { Common } from '../../Constant/Common';

@Component({
  selector: "app-user",
  templateUrl: './user.component.html',
  styleUrls: []
})
@Injectable()
export class UserComponent implements OnInit {
  @Input() hideButton: number;

  userList: IUser[];
  loading = true;
  showList = true;
  userAdded: number = 0;
  isReload: number = 0;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    console.log(this.hideButton);
    this.loading = false;
  }

  onAddNew() {
    this.loading = false;
    this.showList = false;
  }


  onReload() {
    this.isReload = Common.setRadomNumber();
    this.showList = true;
    this.loading = false;
  }

  getEventFromAddUser($event) {
    if ($event.success == 1) {
      this.userAdded = $event.item;
      this.onReload();
    }
  }
}
