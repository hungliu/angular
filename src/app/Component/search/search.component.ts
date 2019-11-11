import { Component, OnInit } from "@angular/core";
import { Common } from "../../Constant/Common";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: []
})
export class SearchComponent implements OnInit {
  constructor() {}

  showList: boolean = false;
  searchValue: string;
  readyLoad: number = 0;

  ngOnInit() {}

  searchText: string;
  onSubmit(form) {
    if (form.value.txtSearch.length > 0) {
      this.searchText = form.value.txtSearch;
      this.showList = true;
      this.readyLoad = Common.setRadomNumber();
    } else {
      this.showList = false;
    }
  }

  onReset(form) {
    form.reset();
  }

  ResultFinish($event) {
    console.log("ccc:" + $event);
    if ($event == 1) this.showList = true;
    else this.showList = false;
  }
  // Navigate($event) {
  //   this.loadData(this.searchValue, $event, this.pageSize);
  // }

  // loadData(searchText: string, pageIndex: number, pageSize: number) {
  //   this.spinner.show();

  //   this.searchValue = searchText;

  //   this.userService
  //     .searchUser(searchText, pageIndex, pageSize)
  //     .subscribe(data => {
  //       this.readyLoad = 1;

  //       setTimeout(() => {
  //         this.spinner.hide();
  //       }, 500);

  //       this.userList = data;

  //       if (this.userList.length > 0) {
  //         this.showList = true;
  //       }
  //     });
  // }
}
