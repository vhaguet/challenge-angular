import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';

import { UserState } from 'src/app/user/states/user.state';
import { UserService } from 'src/app/user/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { mockUsers } from 'src/app/mocks';
import { FetchAllUser } from './user.actions';

describe('UserSelectors', () => {
  let store: Store;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(HttpClientInMemoryWebApiModule.forRoot(DataService)),
        MockModule(NgxsModule.forRoot([UserState])),
        MockModule(HttpClientTestingModule),
        MockModule(RouterTestingModule),
      ],
      providers: [MockProvider(UserService)],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    service = TestBed.inject(DataService);
    // store.reset({
    //   ...store.snapshot(),
    //   user: {
    //     currentUser: null,
    //     users: mockUsers,
    //   },
    // });
  });

  it('should select userList', () => {
    service.createDb();

    const user = store.selectSnapshot((state) => state);
    console.log({ user });
    expect(user?.users).toBeTruthy();
  });
});
