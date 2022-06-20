import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { UserService } from '../../services/user.service';
import { AddUser } from '../../user-actions';
import { UserDataService } from '../../user-data.service';
import { UserState } from '../../user-state';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(UserDataService),
      ],
      declarations: [CreateUserComponent],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should add user', async () => {
    await store
      .dispatch(new AddUser({ username: 'myUsername', email: 'myEmail' }))
      .toPromise();

    const user = store.selectSnapshot((state) => state.user);
    expect(user.currentUser).toEqual({
      id: 11,
      username: 'myUsername',
      email: 'myEmail',
    });
  });

  it('should dispatch addUser once', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.onSubmit({ username: 'myUsername', email: 'myEmail' });
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });
});
