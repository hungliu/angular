export interface IUser {
  id: number;
  createdAt: Date;
  name: string;
  avatar: string;
  sex: string;
  tel: string;
  //addressList: Address[];
}

export interface Address {
  adress: string;
  city: string;
  country: string;
}

// enum Status {
//   Pending = 1,
//   Aprroved = 2,
//   Deleted = 3
// }
