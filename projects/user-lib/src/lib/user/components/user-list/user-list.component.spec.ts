import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestBed } from '@angular/core/testing';
import {
  DefaultRenderComponent,
  MockedComponentFixture,
  MockRender,
  MockReset,
  ngMocks,
} from 'ng-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { mockUsers } from 'projects/user-lib/src/lib/mocks';
import { UserListComponent } from 'projects/user-lib/src/lib/user/components/user-list/user-list.component';
import { DataService } from 'projects/user-lib/src/lib/shared/services/data.service';
import { UserState } from 'projects/user-lib/src/lib/user/states/user.state';
import { FetchAllUser } from 'projects/user-lib/src/lib/user/states/user.actions';
import { UserSelectors } from 'projects/user-lib/src/lib/user/states/user.selectors';
import { UserService } from 'projects/user-lib/src/lib/user/services/user.service';

describe('UserListComponent', () => {
  let fixture: MockedComponentFixture<UserListComponent>;
  let component: DefaultRenderComponent<UserListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
      ],
      declarations: [UserListComponent],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<ca-user-list></ca-user-list>`);
    component = fixture.componentInstance;
    store = ngMocks.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', async () => {
    await lastValueFrom(store.dispatch(FetchAllUser));
    const users = store.selectSnapshot(UserSelectors.userList);
    // console.log({ users });
    // console.log(users?.length);
    // console.log({ mockUsers });
    // console.log(mockUsers?.length);
    expect(users?.length).toEqual(mockUsers?.length);
  });

  afterAll(MockReset);
});
