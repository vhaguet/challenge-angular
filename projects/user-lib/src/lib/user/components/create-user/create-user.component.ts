import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddUser } from 'projects/user-lib/src/lib/user/states/user.actions';
import { UserSelectors } from 'projects/user-lib/src/lib/user/states/user.selectors';
import { UserInputInterface } from 'projects/user-lib/src/lib/user/types/user-input.interface';

@Component({
  selector: 'ca-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  @Select(UserSelectors.isLoading) isSubmitting$!: Observable<boolean>;
  initialValues: UserInputInterface = {
    username: '',
    email: '',
  };
  // @Select(UserSelectors.validationErrors)
  // validationErrors$!: Observable<boolean>;

  constructor(private store: Store) {}

  onSubmit(userInput: UserInputInterface): void {
    this.store.dispatch(new AddUser(userInput));
  }
}
