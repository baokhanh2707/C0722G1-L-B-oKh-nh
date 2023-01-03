import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Facility} from './facility';
import {FacilityType} from './facility-type';
import {RentType} from './rent-type';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  URL_FACILITY = 'http://localhost:3000/facility';
  URL_FACILITY_TYPE = 'http://localhost:3000/facility-type';
  URL_RENT_TYPE = 'http://localhost:3000/rent-type';

  constructor(private http: HttpClient) {
  }

  getALl(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.URL_FACILITY);
  }
  getType(): Observable<FacilityType[]>{
    return this.http.get<FacilityType[]>(this.URL_FACILITY_TYPE);
  }
  getRentType(): Observable<RentType[]>{
    return this.http.get<RentType[]>(this.URL_RENT_TYPE);
  }
}
