import { Component, Input } from '@angular/core';
import { UserInterface } from '../../types/user.interface';

@Component({
  selector: 'ca-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input('user') userProps!: UserInterface;
}
