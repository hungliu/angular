import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FnParam } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: []
})
export class UserDetailComponent implements OnInit {
  userId: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        console.log("VO DAY:" + params.id);
        this.userId = params.id;
      }
    });
  }

  ngOnInit() {}
}
