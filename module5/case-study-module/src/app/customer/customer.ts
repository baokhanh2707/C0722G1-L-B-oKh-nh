import {CustomerType} from './customer-type';

export interface Customer {
  id?: number;
  customerTypeId?: CustomerType;
  name?: string;
  dateOfBirth?: string;
  idCard?: string;
  phoneNumber?: string;
  gender?: string;
  email?: string;
  address?: string;
}
