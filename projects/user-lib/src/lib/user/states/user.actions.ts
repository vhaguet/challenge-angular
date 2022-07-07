import { UserInputInterface } from 'projects/user-lib/src/lib/user/types/user-input.interface';

export class AddUser {
  static readonly type = '[User] Add one';
  constructor(public newUser: UserInputInterface) {}
}

export class GetUser {
  static readonly type = '[User] Get one';
  constructor(public id: number) {}
}

export class FetchAllUser {
  static readonly type = '[User] Fetch All';
}
