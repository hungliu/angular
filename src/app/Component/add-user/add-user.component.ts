import {
  Component,
  OnInit,
  Injectable,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { User, Address } from "../../Models/User";
import { UserService } from "../../Services/UserService";
import { Common } from "../../Constant/Common";
import { Router } from "@angular/router";
import { NgbSlide } from "@ng-bootstrap/ng-bootstrap";
import {
  debounceTime,
  switchMap,
  filter,
  distinctUntilChanged
} from "rxjs/operators";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: []
})
@Injectable()
export class AddUserComponent implements OnInit {
  // send event to UserCpn
  @Output() addUserFinishEvent = new EventEmitter<object>();
  @Input() userDetail: User;
  //
  isUpdateMode: boolean = false;
  // check submit form
  submitted: Boolean = false;
  //data bind to select box
  SexArr: string[] = ["Male", "Female", "Other"];
  // user: User = new User(
  //   Common.setRadomNumber(),
  //   new Date(),
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   []
  // );

  // declare controls
  myform: FormGroup;
  name: FormControl;
  tel: FormControl;
  sex: FormControl;
  avatar: FormControl;
  email: FormControl;
  addressList: FormArray;

  constructor(
    private userService: UserService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  //  run whenever it detects changes to input properties
  ngOnChanges(changes: SimpleChanges) {
    if (changes["userDetail"]) {
      if (this.userDetail != undefined || this.userDetail != null) {
        this.isUpdateMode = true;
        this.myform.patchValue({
          name: this.userDetail.name,
          tel: this.userDetail.tel,
          sex: this.userDetail.sex,
          avatar: this.userDetail.avatar,
          email: this.userDetail.email
        });

        // rebind data to form array address
        if (
          this.userDetail.addressList != null &&
          this.userDetail.addressList.length > 0
        ) {
          this.AddressListControl.clear();

          this.userDetail.addressList.forEach(address => {
            this.AddressListControl.push(this.initAddressGroup(address));
          });
        }
      }
    }
  }

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
    this.addressList = this.formBuilder.array([this.initAddressGroup(null)]);

    // init form and add controls to form
    this.myform = this.formBuilder.group({
      name: this.name,
      tel: this.tel,
      sex: this.sex,
      avatar: this.avatar,
      email: this.email,
      addressList: this.addressList
    });
  }

  initAddressGroup(addressItem: Address) {
    if (addressItem == null) {
      return this.formBuilder.group({
        address: new FormControl(""),
        city: new FormControl(""),
        country: new FormControl("")
      });
    } else {
      return this.formBuilder.group({
        address: new FormControl(
          addressItem == null ? "" : addressItem.address
        ),
        city: new FormControl(addressItem == null ? "" : addressItem.city),
        country: new FormControl(addressItem == null ? "" : addressItem.country)
      });
    }
  }

  get AddressListControl(): FormArray {
    return this.myform.get("addressList") as FormArray;
  }

  addMoreAddress() {
    this.addressList.push(this.initAddressGroup(null));
  }

  removeAddress(index: number) {
    if (this.addressList.length == 1) {
      window.alert("least one");
      return;
    }
    console.log("remove at: " + index);
    this.addressList.removeAt(index);
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
        addressList: this.addressList.value //(this.myform.get("AddressList") as FormArray).value
      };

      // for add new user
      if (this.isUpdateMode == false) {
        this.userService.addUser(user).subscribe(data => {
          this.myform.reset();
          this.addUserFinishEvent.emit({
            success: 1,
            item: user
          });
        });
      } else {
        // for edit user
        this.userService.updateUser(user).subscribe(data => {
          this.myform.reset();
          this.addUserFinishEvent.emit({
            success: 1,
            item: user
          });
        });
      }
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
