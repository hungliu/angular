import { Component, OnInit, Injectable, Input } from '@angular/core';
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
  @Input() hideButton:number;
  
  constructor(private userService: UserService) {
  }


  userList: IUser[];
  
  loading = true;
  showList = true;
  
  onAddNew(){
    this.loading = false;
     this.showList= false ;
  }

  onReload(){
    this.showList= true;
    this.loading= true ;
    this.loadData();
    
  }
  
  loadData(){
    this.userService.getUserList()
    .subscribe( data => {
       this.userList = data;
       this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }
}



