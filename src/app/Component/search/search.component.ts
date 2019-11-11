import { Component, OnInit } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../../Services/UserService";
import { User } from "../../Models/User";
import { NgxSpinnerService } from "ngx-spinner";
import { Paging } from "../../Constant/Paging";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: []
})
export class SearchComponent implements OnInit {
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  userList: User[];
  showList: boolean = false;
  searchValue: string;
  pageIndex: number = Paging.PageIndex;
  pageSize: number = Paging.PageSize;
  pageTotal: number = 100;
  // properties for userlist component
  readyLoad: number = 0;

  ngOnInit() {}
  //seachTypes: any[] = [{ id: 1, label: "Product" }, { id: 2, label: "User" }];

  onSubmit(form) {
    this.loadData(form.value.txtSearch, this.pageIndex, this.pageSize);
  }

  onReset(form) {
    form.reset();
  }

  Navigate($event) {
    this.loadData(this.searchValue, $event, this.pageSize);
  }

  loadData(searchText: string, pageIndex: number, pageSize: number) {
    this.spinner.show();

    this.searchValue = searchText;

    this.userService
      .searchUser(searchText, pageIndex, pageSize)
      .subscribe(data => {
        this.readyLoad = 1;

        setTimeout(() => {
          this.spinner.hide();
        }, 500);

        this.userList = data;

        if (this.userList.length > 0) {
          this.showList = true;
        }
      });
  }
}
