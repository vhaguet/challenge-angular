import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { UserService } from '../../services/user.service';
import { GetUser } from '../../user-actions';
import { UserDataService } from '../../user-data.service';
import { UserState } from '../../user-state';
import { UserViewComponent } from './user-view.component';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(UserDataService),
      ],
      declarations: [UserViewComponent],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should show user', async () => {
    await store.dispatch(new GetUser(3)).toPromise();

    const user = store.selectSnapshot((state) => state.user);

    expect(user.currentUser.id).toBe(3);
  });
});
