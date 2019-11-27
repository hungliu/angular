import {
  Component,
  OnInit,
  Injectable,
  ViewChild,
  AfterContentChecked
} from '@angular/core';
import { UserService } from '../../Services/UserService';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from '../../Interface/IUser';
import { Paging } from '../../Constant/Paging';
import { Common } from '../../Constant/Common';
import { Address, User } from '../../Models/User';

import { AddEvent, EditEvent, GridDataResult, DataStateChangeEvent, GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { State, SortDescriptor, orderBy, groupBy, GroupDescriptor } from '@progress/kendo-data-query';

import { Observable } from 'rxjs';
import { delay } from 'q';
import { map, filter } from 'rxjs/operators';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list-v2',
  templateUrl: './user-list-v2.component.html',
  styleUrls: ['./user-list-v2.component.css']
})
@Injectable()
export class UserListV2Component implements OnInit, AfterContentChecked {
  @ViewChild('grid', { static: true }) grid: GridComponent;
  GenderArr: any[] = [
    { value: 1, text: 'Male' },
    { value: 2, text: 'Female' },
    { value: 3, text: 'Other' },
  ];
  gridData: GridDataResult;
  pageIndex: number = Paging.PageIndex;
  pageSize: number = Paging.PageSize;
  pageTotal = 100;
  loading = false;
  skip = 0;
  sort: SortDescriptor[] = [];

  isEditingMode = false;
  isAddNewMode = false;

  formGroup: FormGroup;

  dataListOriginalInPage: User[] = [];
  dataItemTempInAction: User;
  indexItemInAction: any;

  addressList: FormArray = new FormArray([]);
  secondTabReadyLoad = false;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  public hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  tabChanged($event) {
    if ($event.index === 3) {
      this.secondTabReadyLoad = true;
    }
  }

  get AddressListControl(): FormArray {
    return this.formGroup.get('addressList') as FormArray;
  }

  initAddressGroup(addressItem: Address) {
    if (addressItem == null) {
      return this.formBuilder.group({
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
      });
    } else {
      return this.formBuilder.group({
        address: new FormControl(
          addressItem == null ? '' : addressItem.address, Validators.required
        ),
        city: new FormControl(addressItem == null ? '' : addressItem.city, Validators.required),
        country: new FormControl(addressItem == null ? '' : addressItem.country, Validators.required)
      });
    }
  }

  removeAddress(index) {
    this.AddressListControl.removeAt(index);
  }

  addMoreAddress() {
    if (this.addressList.length > 4) {
      window.alert('limit 5 address');
      return;
    }
    this.AddressListControl.push(this.initAddressGroup(null));
  }

  cancelEdit($event) {
    this.closeEditor(this.grid, this.indexItemInAction);
    this.addressList.clear();
  }

  closeEditor(grid, rowIndex) {
    grid.closeRow(rowIndex);
    this.indexItemInAction = undefined;
    this.formGroup = undefined;
    this.isEditingMode = false;
    this.dataItemTempInAction = undefined;
  }

  saveRow({ sender, rowIndex, formGroup, isNew }) {
    if (isNew === false) { // for update
      if (this.formGroup.invalid) {
        window.alert('invalid');
        return;
      }
      const index = rowIndex - this.grid.skip;
      this.dataListOriginalInPage[index] = this.formGroup.value;
      this.dataListOriginalInPage[index].addressList = [];
      this.AddressListControl.controls.forEach(item => {
        this.dataListOriginalInPage[index].addressList.push(new Address(
          item.get('address').value,
          item.get('city').value,
          item.get('country').value
        ));
      });
    } else { // for add new

    }
    this.addressList.clear();
    this.closeEditor(this.grid, rowIndex);
  }

  addnew() {
    this.isAddNewMode = true;
    this.addressList.clear();

    this.closeEditor(this.grid, this.indexItemInAction);
    this.formGroup = new FormGroup({
      id: new FormControl(Common.setRadomNumber()),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      sex: new FormControl(''),
      addressList: this.addressList
    });
    this.AddressListControl.push(this.initAddressGroup(null));
    this.grid.addRow(this.formGroup);
  }

  removeItem($event) {
    const index = $event.rowIndex - this.grid.skip;
    this.dataListOriginalInPage.splice(index, 1);
    this.gridData = {
      data: this.dataListOriginalInPage,
      total: Paging.PageTotal,
    };
  }

  editItem({ sender, rowIndex, dataItem }) {
    if (this.isEditingMode) {
      return;
    }
    this.editRow(dataItem, rowIndex);
  }

  public cellClickHandler({ isEdited, dataItem, rowIndex }) {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }
    // this.saveCurrent();
    // if (this.isEditingMode || this.isAddNewMode) {
    //   return;
    // }
    this.editRow(dataItem, rowIndex);
  }

  editRow(dataItem, rowIndex) {
    this.addressList.clear();
    this.closeEditor(this.grid, this.indexItemInAction);

    this.isEditingMode = true;
    this.isAddNewMode = false;

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      name: new FormControl(dataItem.name, Validators.required),
      email: new FormControl(dataItem.email, Validators.required),
      tel: new FormControl(dataItem.tel, Validators.required),
      sex: new FormControl(dataItem.sex),
      addressList: this.addressList
    });

    if (dataItem.addressList != null && dataItem.addressList.length > 0) {
      dataItem.addressList.forEach(i => {
        this.AddressListControl.push(this.initAddressGroup(i));
      });
    } else {
      this.AddressListControl.push(this.initAddressGroup(null));
    }

    this.grid.editRow(rowIndex, this.formGroup);
    // pass to temp
    this.indexItemInAction = rowIndex;
    this.dataItemTempInAction = dataItem;
  }

  sortChange(sort: SortDescriptor[]) {
    console.log(sort);
    this.sort = sort;
    this.gridData = {
      data: orderBy(this.dataListOriginalInPage, this.sort),
      total: Paging.PageTotal
    };
  }

  pageChange($event) {
    this.skip = $event.skip;
    this.pageIndex = ($event.skip / this.pageSize) + 1;
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngAfterContentChecked() {
    // bind data
    this.grid.data = this.gridData;
    // paging
    this.grid.pageSize = this.pageSize;
    this.grid.skip = this.skip;
    //
    this.grid.height = 400;
    this.grid.loading = this.loading;
    this.grid.resizable = true;
    this.grid.pageable = true;
    // this.grid.selectable = { mode: 'single' };
    this.grid.columns.forEach(col => {
      col.headerStyle = { 'background-color': '#3f51b5', color: '#fff', 'line-height': '1em' };
    });
    // sort
    this.grid.sortable = { allowUnsort: true, mode: 'single' };
    this.grid.sort = this.sort;
  }

  loadData(pageIndex: number, pageSize: number) {
    this.closeEditor(this.grid, this.indexItemInAction);
    this.loading = true;
    this.userService.getListUserWithAdap(pageIndex, pageSize)
      .subscribe(
        result => {
          console.log(result);
          this.loading = false;
          this.dataListOriginalInPage = result;
          this.gridData = {
            data: result,
            total: Paging.PageTotal,
          };
        },
        err => {
          window.alert('not connect server-json');
        }
      );
  }

  reload() {
    this.skip = 0;
    this.pageIndex = Paging.PageIndex;
    this.pageSize = Paging.PageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  selectionChange($event, emalControl) {
    const a = $event;
    this.formGroup.get('email').setValue($event.value);

  }
}
