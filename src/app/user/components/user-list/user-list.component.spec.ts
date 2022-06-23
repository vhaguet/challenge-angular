import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBuilder, MockRender, MockReset } from 'ng-mocks';

import { UserListComponent } from 'src/app/user/components/user-list/user-list.component';
import { DataService } from 'src/app/shared/services/data.service';
import { UserState } from 'src/app/user/states/user.state';
import { UserModule } from 'src/app/user/user.module';
import { FetchAllUser } from 'src/app/user/states/user.actions';
import { UserService } from 'src/app/user/services/user.service';

fdescribe('UserListComponent', () => {
  let store: Store;
  // let component: UserListComponent;
  // let fixture: ComponentFixture<UserListComponent>;

  // const initTestBed = () => {
  //   return MockBuilder(UserListComponent, [UserModule])
  //     .keep(NgxsModule.forRoot([UserState]), { export: true })
  //     .keep(HttpClientInMemoryWebApiModule.forRoot(DataService))
  //     .replace(HttpClientModule, HttpClientTestingModule)
  //     .replace(RouterModule, RouterTestingModule);
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        NgxsModule.forRoot([UserState]),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [UserService],
    });
  });

  beforeEach(() => {
    //   fixture = MockRender(UserListComponent);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    const fixture = MockRender(`<ca-user-list></ca-user-list>`);
    expect(fixture.componentInstance).toBeTruthy();
  });

  // it('should create component', () => {
  //   expect(component).toBeDefined();
  // });

  // it('should fetchAllUser dispatch action FetchAllUser', () => {
  //   const fixture = MockRender(`<ca-user-list></ca-user-list>`);
  //   spyOn(store, 'dispatch');

  //   fixture.detectChanges();

  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });

  // it('should dispatch to have been called with FetchAllUser action', () => {
  //   spyOn(store, 'dispatch');
  //   component.fetchAllUser();
  //   expect(store.dispatch).toHaveBeenCalledWith(FetchAllUser);
  // });

  // afterAll(MockReset);
});
