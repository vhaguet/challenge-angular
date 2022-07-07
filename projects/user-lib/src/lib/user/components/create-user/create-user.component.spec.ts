import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {
  DefaultRenderComponent,
  MockedComponentFixture,
  MockRender,
  MockReset,
  ngMocks,
} from 'ng-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CreateUserComponent } from 'projects/user-lib/src/lib/user/components/create-user/create-user.component';
import { DataService } from 'projects/user-lib/src/lib/shared/services/data.service';
import { UserState } from 'projects/user-lib/src/lib/user/states/user.state';
import { AddUser } from 'projects/user-lib/src/lib/user/states/user.actions';
import { UserService } from 'projects/user-lib/src/lib/user/services/user.service';

describe('CreateUserComponent', () => {
  let fixture: MockedComponentFixture<CreateUserComponent>;
  let component: DefaultRenderComponent<CreateUserComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
      ],
      declarations: [CreateUserComponent],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<ca-create-user></ca-create-user>`);
    component = fixture.componentInstance;
    store = ngMocks.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialValues be empty', () => {
    expect(component.initialValues).toEqual({
      username: '',
      email: '',
    });
  });

  it('should onSubmit dispatch action AddUser', () => {
    spyOn(store, 'dispatch');
    component.onSubmit({ username: 'myUsername', email: 'myEmail' });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch to have been called with AddUser action', () => {
    spyOn(store, 'dispatch');
    component.onSubmit({ username: 'myUsername', email: 'myEmail' });
    expect(store.dispatch).toHaveBeenCalledWith(
      new AddUser({ username: 'myUsername', email: 'myEmail' })
    );
  });

  afterAll(MockReset);
});
