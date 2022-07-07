import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from 'projects/user-lib/src/lib/user/components/create-user/create-user.component';
import { UserListComponent } from 'projects/user-lib/src/lib/user/components/user-list/user-list.component';
import { UserViewComponent } from 'projects/user-lib/src/lib/user/components/user-view/user-view.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLibRoutingModule {}
