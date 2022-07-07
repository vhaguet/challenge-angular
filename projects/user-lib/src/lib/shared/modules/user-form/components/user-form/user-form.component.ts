import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserInputInterface } from 'projects/user-lib/src/lib/user/types/user-input.interface';

@Component({
  selector: 'ca-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: UserInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean | null;

  @Output('userSubmit') userSubmitEvent =
    new EventEmitter<UserInputInterface>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.userSubmitEvent.emit(this.form.value);
    }
  }
}
