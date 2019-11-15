import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Services/UserService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: []
})
@Injectable()
export class UserDetailComponent implements OnInit {
  userId = 0;
  userDetail: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.userService
          .getUserById(params.id)
          .pipe(
            map((data: User[]) => {
              if (data.length > 0) {
                return data[0];
              } else {
                return new User(-1, new Date(), '', '', '', '', '', []);
              }
            })
          )
          .subscribe(user => {
            this.userId = 9999;
            this.userDetail = user;
          });
      }
    });
  }
}
