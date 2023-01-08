import {SanPham} from './san-pham';

export interface LoHang {
  id?: number;
  maLoHang?: string;
  tenSanpham?: SanPham;
  soLuong?: number;
  ngayNhapHang?: string;
  ngaySanXuat?: string;
  ngayHetHan?: string;
}
