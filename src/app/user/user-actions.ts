import { UserInterface } from 'src/app/user/types/user.interface';

export class AddUser {
  static readonly type = '[User] Add one';
  constructor(public newUser: UserInterface) {}
}

export class GetUser {
  static readonly type = '[User] Get one';
  constructor(public id: number) {}
}

export class FetchAllUser {
  static readonly type = '[User] Fetch All';
}
