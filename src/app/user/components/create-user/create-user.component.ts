import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddUser } from 'src/app/user/user-actions';
import { UserSelectors } from 'src/app/user/user-selectors';
import { UserInputInterface } from 'src/app/user/types/user-input.interface';

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
