import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { UserService } from '../../services/user.service';
import { FetchAllUser } from '../../user-actions';
import { UserDataService } from '../../user-data.service';
import { UserState } from '../../user-state';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(UserDataService),
      ],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should dispatch users list', async () => {
    await store.dispatch(FetchAllUser).toPromise();

    const user = store.selectSnapshot((state) => state.user);

    expect(user.users.length).toBeGreaterThan(0);
  });
});
