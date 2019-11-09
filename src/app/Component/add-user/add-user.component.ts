import {
  Component,
  OnInit,
  Injectable,
  Output,
  EventEmitter
} from "@angular/core";

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { IUser } from "../../Interface/IUser";
import { UserService } from "../../Services/UserService";
import { Common } from "../../Constant/Common";
import { Router } from "@angular/router";
import { NgbSlide } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: []
})
@Injectable()
export class AddUserComponent implements OnInit {
  // send event to UserCpn
  @Output() addUserFinishEvent = new EventEmitter<object>();
  // check submit form
  submitted: Boolean = false;
  //data bind to select box
  SexArr: string[] = ["Male", "Female", "Other"];
  // declare controls
  myform: FormGroup;
  name: FormControl;
  tel: FormControl;
  sex: FormControl;
  avatar: FormControl;
  email: FormControl;
  AddressList: FormArray;

  constructor(
    private userService: UserService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // init control

    this.name = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.tel = new FormControl("", Validators.required);
    this.sex = new FormControl("", Validators.required);
    this.avatar = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.AddressList = this.formBuilder.array([this.initAddressGroup()]);

    // init form and add controls to form
    this.myform = this.formBuilder.group({
      name: this.name,
      tel: this.tel,
      sex: this.sex,
      avatar: this.avatar,
      email: this.email,
      AddressList: this.AddressList
    });
  }

  initAddressGroup() {
    return this.formBuilder.group({
      Address: new FormControl(""),
      City: new FormControl(""),
      Country: new FormControl("")
    });
  }

  // get AddressList() {
  //   return this.myform.get("address") as FormArray;
  // }

  addMoreAddress() {
    this.AddressList.push(this.initAddressGroup());
    //let f = this.myform.get("address") as FormArray;
    //f.push(this.initAddressGroup());
  }

  removeAddress(index: number) {
    if (this.AddressList.length == 1) {
      window.alert("least one");
      return;
    }
    console.log("remove at: " + index);
    this.AddressList.removeAt(index);
    //(this.myform.get("address") as FormArray).removeAt(index);
  }

  //submit form function
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
        AddressList: this.AddressList.value //(this.myform.get("AddressList") as FormArray).value
      };

      this.userService.addUser(user).subscribe(data => {
        this.myform.reset();
        this.addUserFinishEvent.emit({
          success: 1,
          item: user
        });
      });
    } else {
      console.log("invalidation");
    }
  }
  // reset form function
  onResetForm() {
    this.myform.reset();
  }

  borderControlValid(control: FormControl): string {
    if (
      (control.invalid && control.dirty) ||
      (this.submitted && control.invalid)
    ) {
      return "has-error";
    } else if (control.valid && control.dirty) {
      return "has-success";
    } else {
      return "";
    }
  }
}
