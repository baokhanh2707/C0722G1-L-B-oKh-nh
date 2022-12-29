import {FacilityType} from './facilityType';
import {RentType} from './rentType';

export interface Facility {
  image?:string;
  id?: number;
  name?: string;
  area?: number;
  cost?: number;
  maxPeople?: number;
  facilityType?: FacilityType;
  rentType?: RentType;
  standardRoom?: string;
  descriptionOtherConvenience?: string;
  poolArea?: number;
  numberOfFloors?: number;
  facilityFree?: string;
}
