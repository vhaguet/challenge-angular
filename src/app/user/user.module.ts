import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateUserComponent } from 'src/app/user/components/create-user/create-user.component';
import { UserListComponent } from 'src/app/user/components/user-list/user-list.component';
import { UserViewComponent } from 'src/app/user/components/user-view/user-view.component';
import { UserService } from 'src/app/user/services/user.service';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { UserFormModule } from 'src/app/shared/modules/user-form/user-form.module';

const routes = [
  {
    path: 'users',
    title: 'Users component',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'add',
        component: CreateUserComponent,
      },
      {
        path: ':id',
        component: UserViewComponent,
      },
    ],
  },
];

// export users fotRoot -> add forFeature

// folder "state"

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    LoadingModule,
    UserFormModule,
  ],
  declarations: [CreateUserComponent, UserListComponent, UserViewComponent],
  providers: [UserService],
})
export class UserModule {}
