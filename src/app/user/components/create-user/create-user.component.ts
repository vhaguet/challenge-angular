import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserInterface } from 'src/app/user/types/user.interface';
import { AddUser } from 'src/app/user/user-actions';
import { UserSelectors } from 'src/app/user/user-selectors';

@Component({
  selector: 'ca-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @Select(UserSelectors.isLoading) isSubmitting$!: Observable<boolean>;
  @Select(UserSelectors.validationErrors)
  validationErrors$!: Observable<boolean>;

  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: UserInterface = this.form.value;

    this.store.dispatch(new AddUser(request));
  }
}
