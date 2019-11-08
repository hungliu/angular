import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';


import { IUser } from '../../Interface/IUser';
import { UserService } from '../../Services/UserService';
import { Common } from '../../Constant/Common';
import { Router } from '@angular/router';

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
  hobbies: FormArray;

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
    this.hobbies = new FormArray([new FormControl('')]);

    // init form and add controls to form
    this.myform = this.formBuilder.group({
      name: this.name,
      tel: this.tel,
      sex: this.sex,
      avatar: this.avatar,
      email: this.email,
      hobbies: this.hobbies
      // hobbies: this.formBuilder.array([this.formBuilder.control('') ])
      // hobbies: this.formBuilder.array([
      //   { name: 'nhau', time: 1 },
      //   { name: 'boiloi', time: 2 },
      //   { name: 'dabanh', time: 13 },
      // ])
    });

  }

  // get hobbies(): FormArray {
  //   return this.myform.get('hobbies') as FormArray;
  // }

  addHobbies() {
    this.hobbies.push(this.formBuilder.control('xxxxxxxx'));
  }

  removeHobbies(index: number) {
    this.hobbies.removeAt(index);
  }

  // ban message qua cho component cha khi add user thanh cong...
  // tslint:disable-next-line: member-ordering
  @Output() addUserFinishEvent = new EventEmitter<object>();

  constructor(private userService: UserService, private route: Router, private formBuilder: FormBuilder) { }

  SexArr: string[] = ['Male', 'Female', 'Other'];

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.myform.valid) {
      let user = {
        id: Common.setRadomNumber(),
        sex: this.sex.value,
        name: this.name.value,
        tel: this.tel.value,
        email: this.email.value,
        avatar: this.avatar.value,
        createdAt: new Date(),
        hobbies: (this.myform.get('hobbies') as FormArray).value
      };

      this.userService.addUser(user).subscribe(
        data => {
          this.myform.reset();
          this.addUserFinishEvent.emit({
            success: 1,
            item: user
          });
        });
    } else {
      console.log('invalidation');
    }
  }


  borderControlValid(control: FormControl): string {
    if ((control.invalid && control.dirty) || (this.submitted && control.invalid)) {
      return 'has-error';
    } else if (control.valid && control.dirty) {
      return 'has-success';
    } else {
      return '';
    }
  }
}
