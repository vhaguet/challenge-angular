import { AddressInterface } from 'src/app/shared/types/address.interface';
import { CompanyInterface } from 'src/app/shared/types/company.interface';

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
