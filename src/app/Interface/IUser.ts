
export interface IUser {
    id: number;
    createdAt: Date;
    name: string;
    avatar: string;
    sex: string;
    tel: string;
    status: Status;
}

enum Status {
    Pending = 1,
    Aprroved = 2,
    Deleted = 3
}