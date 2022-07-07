import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserInterface } from 'projects/user-lib/src/lib/user/types/user.interface';
import { UserSelectors } from 'projects/user-lib/src/lib/user/states/user.selectors';
import { GetUser } from 'projects/user-lib/src/lib/user/states/user.actions';

@Component({
  selector: 'ca-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  @Select(UserSelectors.getUser) currentUser$!: Observable<UserInterface>;
  @Select(UserSelectors.isLoading) isLoading$!: Observable<boolean>;

  id!: number;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new GetUser(this.id));
  }
}
