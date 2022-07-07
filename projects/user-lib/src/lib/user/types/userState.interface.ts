import { UserInterface } from 'projects/user-lib/src/lib/user/types/user.interface';

export interface UserStateInterface {
  isLoading: boolean;
  error: string | null;
  users: UserInterface[] | [];
  currentUser: UserInterface | null;
}
