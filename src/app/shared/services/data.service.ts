import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { UserInterface } from 'src/app/user/types/user.interface';
import { mockUsers } from 'src/app/mocks';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb(): { users: UserInterface[] } {
    const users = mockUsers;
    return { users };
  }

  genId(users: UserInterface[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
