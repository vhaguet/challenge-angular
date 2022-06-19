import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchAllUser } from 'src/app/user/user-actions';
import { UserInterface } from 'src/app/user/types/user.interface';
import { UserSelectors } from 'src/app/user/user-selectors';

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
    this.store.dispatch(FetchAllUser);
  }
}
