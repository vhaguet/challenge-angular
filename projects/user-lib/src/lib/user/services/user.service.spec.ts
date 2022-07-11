import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { map } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from 'projects/user-lib/src/lib/user/services/user.service';
import { mockUsers } from 'projects/user-lib/src/lib/mocks';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
  });

  test('should be created', () => {
    expect(userService).toBeDefined();
  });

  test('call fetchAllUser()', () => {
    userService.fetchAllUser().subscribe(() => {
      map((data) => {
        expect(data).toEqual(mockUsers);
      });
    });
  });
});
