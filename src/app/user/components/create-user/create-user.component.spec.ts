import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBuilder, MockRender, MockReset } from 'ng-mocks';

import { CreateUserComponent } from 'src/app/user/components/create-user/create-user.component';
import { DataService } from 'src/app/shared/services/data.service';
import { UserState } from 'src/app/user/states/user.state';
import { UserModule } from 'src/app/user/user.module';
import { AddUser } from 'src/app/user/states/user.actions';

describe('CreateUserComponent', () => {
  let store: Store;
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  const initTestBed = () => {
    return MockBuilder(CreateUserComponent, [UserModule])
      .keep(NgxsModule.forRoot([UserState]), { export: true })
      .keep(HttpClientInMemoryWebApiModule.forRoot(DataService))
      .replace(HttpClientModule, HttpClientTestingModule)
      .replace(RouterModule, RouterTestingModule);
  };

  beforeEach(initTestBed);

  beforeEach(() => {
    fixture = MockRender(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
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
