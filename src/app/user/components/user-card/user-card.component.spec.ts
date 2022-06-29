import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockRender } from 'ng-mocks';
import { By } from '@angular/platform-browser';

import { UserService } from 'src/app/user/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { UserState } from 'src/app/user/states/user.state';
import { UserCardComponent } from 'src/app/user/components/user-card/user-card.component';

describe('UserCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState], {}),
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
      ],
      declarations: [UserCardComponent],
      providers: [UserService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = MockRender(`<ca-user-card></ca-user-card>`);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display input user data', () => {
    const fixture = MockRender(`<ca-user-card [user]="user"></ca-user-card>`, {
      user: {
        id: 1,
        username: 'UsernameExample',
        email: 'email@example.com',
      },
    });
    fixture.detectChanges();

    const usernameEl = fixture.debugElement.query(By.css('.user-username'));
    const emailEl = fixture.debugElement.query(By.css('.user-email'));

    expect(usernameEl.nativeElement.innerHTML).toEqual('UsernameExample');
    expect(emailEl.nativeElement.innerHTML).toEqual('email@example.com');
  });
});
