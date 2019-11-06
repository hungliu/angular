import { Component, OnInit, Injectable } from '@angular/core';
// import { ApiUrl } from '../Constant/ApiUrl';
import { UserService } from '../Services/UserService';
import {IUser} from '../Interface/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable()
export class UserComponent implements OnInit {

  
  constructor(private userService: UserService) {
  }

  userList: IUser[];
  // tslint:disable-next-line: no-trailing-whitespace
  
  loading = true;
  // tslint:disable-next-line: no-trailing-whitespace
  
  ngOnInit() {
    this.userService.getUserList()
    .subscribe( data => {
       this.userList = data;
       this.loading = false;
    });

  }
}
