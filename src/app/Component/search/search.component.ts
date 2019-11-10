import { Component, OnInit } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: []
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  seachTypes: any[] = [{ id: 1, label: "Product" }, { id: 2, label: "User" }];

  onSearch(search: string, searchType: number) {
    //   this.myform.controls.name.valueChanges
    //     .pipe(
    //       debounceTime(500),
    //       filter(value => value.length > 3),
    //       distinctUntilChanged()
    //     )
    //     .subscribe(typing => console.log(typing));
    // }
  }
}

// https://codecraft.tv/courses/angular/forms/template-driven/
