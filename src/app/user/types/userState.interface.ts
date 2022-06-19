import { UserInterface } from 'src/app/user/types/user.interface';

export interface UserStateInterface {
  isLoading: boolean;
  error: string | null;
  users: UserInterface[] | [];
  currentUser: UserInterface | null;
}
