import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateUserComponent } from 'projects/user-lib/src/lib/user/components/create-user/create-user.component';
import { UserListComponent } from 'projects/user-lib/src/lib/user/components/user-list/user-list.component';
import { UserViewComponent } from 'projects/user-lib/src/lib/user/components/user-view/user-view.component';
import { UserCardComponent } from 'projects/user-lib/src/lib/user/components/user-card/user-card.component';
import { UserService } from 'projects/user-lib/src/lib/user/services/user.service';
import { LoadingModule } from 'projects/user-lib/src/lib/shared/modules/loading/loading.module';
import { UserFormModule } from 'projects/user-lib/src/lib/shared/modules/user-form/user-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    LoadingModule,
    UserFormModule,
    RouterModule,
  ],
  declarations: [
    CreateUserComponent,
    UserListComponent,
    UserViewComponent,
    UserCardComponent,
  ],
  providers: [UserService],
})
export class UserModule {}
