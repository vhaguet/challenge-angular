import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  DefaultRenderComponent,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { lastValueFrom } from 'rxjs';

import { UserService } from 'projects/user-lib/src/lib/user/services/user.service';
import { GetUser } from 'projects/user-lib/src/lib/user/states/user.actions';
import { DataService } from 'projects/user-lib/src/lib/shared/services/data.service';
import { UserState } from 'projects/user-lib/src/lib/user/states/user.state';
import { UserViewComponent } from 'projects/user-lib/src/lib/user/components/user-view/user-view.component';

describe('UserViewComponent', () => {
  let fixture: MockedComponentFixture<UserViewComponent>;
  let component: DefaultRenderComponent<UserViewComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
      ],
      declarations: [UserViewComponent],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<ca-user-view></ca-user-view>`);
    component = fixture.componentInstance;
    store = ngMocks.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user', async () => {
    await lastValueFrom(store.dispatch(new GetUser(3)));
    const user = store.selectSnapshot((state) => state.user);
    expect(user.currentUser.id).toBe(3);
  });
});
