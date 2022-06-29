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

import { UserListComponent } from 'src/app/user/components/user-list/user-list.component';
import { DataService } from 'src/app/shared/services/data.service';
import { UserState } from 'src/app/user/states/user.state';
import { FetchAllUser } from 'src/app/user/states/user.actions';
import { mockUsers } from 'src/app/mocks';
import { UserSelectors } from 'src/app/user/states/user.selectors';
import { UserService } from 'src/app/user/services/user.service';

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
