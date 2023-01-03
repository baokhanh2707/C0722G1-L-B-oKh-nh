import {CustomerType} from './customer-type';

export interface Customer {
  customerCode?: string;
  id?: number;
  code?: string;
  customerTypeId?: CustomerType;
  name?: string;
  dateOfBirth?: string;
  idCard?: string;
  phoneNumber?: string;
  gender?: string;
  email?: string;
  address?: string;
}
