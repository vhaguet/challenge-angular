import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { AddUser, FetchAllUser, GetUser } from 'src/app/user/states/user.actions';
import { UserStateInterface } from 'src/app/user/types/userState.interface';
import { tap } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

const initialState: UserStateInterface = {
  isLoading: false,
  users: [],
  currentUser: null,
  error: null,
};

@State<UserStateInterface>({
  name: 'user',
  defaults: initialState,
})
@Injectable()
export class UserState {
  @Action(AddUser)
  addUser(ctx: StateContext<UserStateInterface>, action: AddUser) {
    const { newUser } = action;

    ctx.patchState({ isLoading: true });
    const state = ctx.getState();

    return this.userService.addUser(newUser).pipe(
      tap((user) => {
        ctx.patchState({
          users: [...state.users, user],
          currentUser: user,
          isLoading: false,
        });
      })
    );
  }

  @Action(GetUser)
  getUser(ctx: StateContext<UserStateInterface>, action: GetUser) {
    const { id } = action;

    const state = ctx.getState();
    let currentUser = state.currentUser;

    if (currentUser !== null && currentUser.id !== id) {
      currentUser = null;
    }

    ctx.patchState({ currentUser: currentUser, isLoading: true });

    return this.userService.getUser(id).pipe(
      tap((user) => {
        ctx.patchState({
          currentUser: user,
          isLoading: false,
        });
      })
    );
  }

  @Action(FetchAllUser)
  fetchAllUser(ctx: StateContext<UserStateInterface>) {
    ctx.patchState({ isLoading: true });

    // const state = ctx.getState();

    return this.userService.fetchAllUser().pipe(
      tap((users) => {
        ctx.patchState({
          users: users,
          isLoading: false,
        });
      })
    );
  }

  constructor(private userService: UserService) {}
}
