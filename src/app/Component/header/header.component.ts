import { Component, OnInit } from "@angular/core";
import { RouteName } from "../../Constant/RouteName";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  constructor() {}

  routes = {
    home: RouteName.HOME,
    search: RouteName.SEARCH,
    user: RouteName.USER,
    product: RouteName.PRODUCT
  };

  ngOnInit() {}
}
