import { Selector } from '@ngxs/store';

import { UserState } from 'projects/user-lib/src/lib/user/states/user.state';
import { UserInterface } from 'projects/user-lib/src/lib/user/types/user.interface';
import { UserStateInterface } from 'projects/user-lib/src/lib/user/types/userState.interface';

export class UserSelectors {
  @Selector([UserState])
  static userList(state: UserStateInterface): UserInterface[] | null {
    return state.users;
  }

  @Selector([UserState])
  static getUser(state: UserStateInterface): UserInterface | null {
    return state.currentUser;
  }

  @Selector([UserState])
  static isLoading(state: UserStateInterface): boolean {
    return state.isLoading;
  }

  @Selector([UserState])
  static validationErrors(state: UserStateInterface): string | null {
    return state.error;
  }
}
