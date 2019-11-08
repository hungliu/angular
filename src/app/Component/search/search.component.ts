import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  seachTypes: any[] = [
    {id:1, label: 'Product'},
    {id:2, label: 'User'}
  ];

  onSearch(search: string , searchType: number) {

  }
}
