import {
  Component,
  OnInit,
  Injectable,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { UserService } from "../../Services/UserService";
import { IUser } from "../../Interface/IUser";
import { Paging } from "../../Constant/Paging";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/Models/User";
@Injectable()
@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: []
})
export class UserlistComponent implements OnInit {
  pageIndex: number = Paging.PageIndex;
  pageSize: number = Paging.PageSize;
  pageTotal: number = 100;
  userList: IUser[];

  @Input() readyLoad: number;
  @Input() isReload: number;
  @Input() userListFromParent: IUser[];
  @Input() searchText: string;

  @Output() searchResultFinish = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (this.readyLoad == 1) {
      this.loadData(this.pageIndex, this.pageSize);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["isReload"] && this.isReload != 0) {
      console.log("onChanged - reloadpage: " + this.isReload);
      this.pageIndex = 1;
      this.loadData(this.pageIndex, this.pageSize);
    }
    if (changes["readyLoad"]) {
      this.pageIndex = 1;
      this.loadDataSearch(this.searchText, this.pageIndex, this.pageSize);
    }
  }

  Navigate($event) {
    if (this.searchText == "" || this.searchText == undefined)
      this.loadData($event, this.pageSize);
    else this.loadDataSearch(this.searchText, $event, this.pageSize);
  }

  loadDataSearch(searchText: string, pageIndex: number, pageSize: number) {
    this.spinner.show();
    this.userService
      .searchUser(this.searchText, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.readyLoad = 1;

        setTimeout(() => {
          this.spinner.hide();
        }, 500);

        this.userList = data;

        //shoot event finish to search cpn
        if (this.userList.length > 0) this.searchResultFinish.emit(1);
        else this.searchResultFinish.emit(0);
      });
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
        window.alert("not connect server-jon");
      }
    );
  }
}
