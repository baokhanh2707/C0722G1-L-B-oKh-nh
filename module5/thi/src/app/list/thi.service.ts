import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoHang} from '../lo-hang';
import {SanPham} from '../san-pham';

@Injectable({
  providedIn: 'root'
})
export class ThiService {
  URL_SANPHAM = 'http://localhost:8080/san-pham';
  URL_LOHANG = 'http://localhost:8080/lo-hang';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LoHang[]> {
      return this.http.get<LoHang[]>(`${(this.URL_LOHANG)}`);
    }
  getSanPham(): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(this.URL_SANPHAM);
  }
  save(loHang: LoHang): Observable<LoHang> {
    return this.http.post<LoHang>(this.URL_LOHANG, loHang);
  }

  delete(id: number | undefined): Observable<LoHang> {
    return this.http.delete<LoHang>(this.URL_LOHANG + '/' + id);
  }

  edit(loHang: LoHang): Observable<LoHang> {
    return this.http.patch<LoHang>(this.URL_LOHANG + '/' + loHang.id, loHang);

  }

  findById(id: number): Observable<LoHang> {
    return this.http.get<LoHang>(this.URL_LOHANG + '/' + id);
  }
}
