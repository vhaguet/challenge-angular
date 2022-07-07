import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { FetchAllUser } from 'projects/user-lib/src/lib/user/states/user.actions';
import { UserInterface } from 'projects/user-lib/src/lib/user/types/user.interface';
import { UserSelectors } from 'projects/user-lib/src/lib/user/states/user.selectors';

@Component({
  selector: 'ca-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // userList$!: Observable<UserInterface[]>;
  @Select(UserSelectors.isLoading) isLoading$!: Observable<boolean>;
  @Select(UserSelectors.userList) userList$!: Observable<UserInterface[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchAllUser();
  }

  fetchAllUser(): void {
    this.store.dispatch(FetchAllUser);
  }
}
