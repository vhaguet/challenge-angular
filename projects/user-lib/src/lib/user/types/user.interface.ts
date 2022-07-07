import { AddressInterface } from 'projects/user-lib/src/lib/shared/types/address.interface';
import { CompanyInterface } from 'projects/user-lib/src/lib/shared/types/company.interface';

export interface UserInterface {
  id: number;
  name?: string;
  username: string;
  email: string;
  address?: AddressInterface;
  phone?: string;
  website?: string;
  company?: CompanyInterface;
}
