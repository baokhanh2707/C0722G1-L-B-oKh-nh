import {Customer} from "../customer/customer";
import {Facility} from "../facility/facility";

class Employee {
}

export interface Contract {
  id: number;
  startDate: string;
  endDate: string;
  deposit: number;
  customer: Customer;
  facility: Facility;
}
