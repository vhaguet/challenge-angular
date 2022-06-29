import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'challenge-angular';

  views = [
    {
      icon: 'add',
      text: 'user',
      address: '/users/add',
    },
    {
      icon: 'list',
      text: 'users',
      address: '/users',
    },
    {
      icon: 'settings',
      text: 'dashboard',
      address: '/dashboard',
    },
  ];
}
