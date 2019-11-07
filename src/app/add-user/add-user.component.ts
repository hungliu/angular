import { Component, OnInit, Injectable } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { IUser } from '../Interface/IUser';
import { UserService } from '../Services/UserService';
import { Common } from '../Constant/Common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

@Injectable()
export class AddUserComponent implements OnInit {
  // declare
  myform: FormGroup;
  name: FormControl;
  tel: FormControl;
  sex: FormControl;
  avatar: FormControl;
  email: FormControl;

  constructor(private userService: UserService) { }

  SexArr: string[] = ["Male", "Female", "Other"];

  onSubmit() {
    if (this.myform.valid) {
      this.userService.addUser({
          id: Common.setRadomNumber(),
          sex: this.sex.value,
          name: this.name.value,
          tel: this.tel.value,
          email: this.email.value,
          avatar: this.avatar.value,
          createdAt: new Date(),
          hobbies: [

          ]
      }).subscribe(data => {
          this.myform.reset();
          console.log('done');
      });
    }
  }


  borderControlValid(control: FormControl): string {
    if (control.invalid && control.dirty) {
      return 'has-error';
    } else if (control.valid && control.dirty) {
      return 'has-success';
    } else {
      return '';
    }
  }

  ngOnInit() {
    // init control
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.tel = new FormControl('', Validators.required);
    this.sex = new FormControl('', Validators.required);
    this.avatar = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);

    // init form and add controls to form
    this.myform = new FormGroup({
      name: this.name,
      tel: this.tel,
      sex: this.sex,
      avatar: this.avatar,
      email: this.email
    });
  }
}
