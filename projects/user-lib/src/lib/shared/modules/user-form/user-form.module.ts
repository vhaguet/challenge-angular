import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
})
export class UserFormModule {}
