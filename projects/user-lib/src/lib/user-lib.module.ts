import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { UserLibRoutingModule } from 'projects/user-lib/src/lib/user-lib-routing.module';
import { UserLibComponent } from 'projects/user-lib/src/lib/user-lib.component';
import { DataService } from 'projects/user-lib/src/lib/shared/services/data.service';
import { UserModule } from 'projects/user-lib/src/lib/user/user.module';
import { UserState } from 'projects/user-lib/src/lib/user/states/user.state';

@NgModule({
  imports: [
    UserLibRoutingModule,
    UserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    NgxsModule.forRoot([UserState], {
      developmentMode: true,
      // developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  declarations: [UserLibComponent],
  exports: [UserLibComponent],
})
export class UserLibModule {}
