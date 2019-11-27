export class User {
  constructor(
    public id: number,
    public createdAt: Date,
    public name: string,
    public email: string,
    public avatar: string,
    public sex: string,
    public tel: string,
    public addressList: Address[] = []
  ) { }

  static adap(item: any): User {
    return new User(
      item.id,
      item.createdAt,
      item.name,
      item.email,
      item.avatar,
      item.sex,
      item.tel,
      item.addressList
    );
  }
}

export class Address {
  address: string;
  city: string;
  country: string;

  constructor(address: string, city: string, country: string) {
    this.address = address;
    this.city = city;
    this.country = country;
  }
}
