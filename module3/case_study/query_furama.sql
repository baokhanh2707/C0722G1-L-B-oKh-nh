use furama_resort;
select * from nhan_vien
where ho_ten like 'H%'or ho_ten like 'T%' or ho_ten like 'K%' and char_length(ho_ten)<=15;

select * from khach_hang
where dia_chi regexp "(Đà Nẵng|Quảng Trị)" and  TIMESTAMPDIFF(year,ngay_sinh,now())between 18 AND 50;

select * from khach_hang;
  
  
select khach_hang.ma_khach_hang , khach_hang.ho_ten, count(hop_dong.ma_khach_hang) as so_lan_dat_phong
from khach_hang join hop_dong on khach_hang.ma_khach_hang = hop_dong.ma_khach_hang
join loai_khach on loai_khach.ma_loai_khach = khach_hang.ma_loai_khach
where loai_khach.ten_loai_khach ='Diamond'
group by ma_khach_hang
order by so_lan_dat_phong;
select * from dich_vu,dich_vu_di_kem,hop_dong_chi_tiet;

CREATE VIEW view_hop_dong
AS 
select hop_dong.ma_khach_hang,hop_dong.ma_hop_dong,dich_vu.ten_dich_vu,hop_dong.ngay_lam_hop_dong,hop_dong.ngay_ket_thuc,(dich_vu.chi_phi_thue +sum( dich_vu_di_kem.gia*hop_dong_chi_tiet.so_luong)) as tong_tien
from hop_dong
join hop_dong_chi_tiet on hop_dong.ma_hop_dong=hop_dong_chi_tiet.ma_hop_dong
join dich_vu_di_kem on dich_vu_di_kem.ma_dich_vu_di_kem=hop_dong_chi_tiet.ma_dich_vu_di_kem
join dich_vu on dich_vu.ma_dich_vu=hop_dong.ma_dich_vu
group by hop_dong.ma_hop_dong;


SELECT 
	khach_hang.ma_khach_hang,
    khach_hang.ho_ten, 
    loai_khach.ten_loai_khach, 
    view_hop_dong.*
FROM
	khach_hang  JOIN loai_khach  ON khach_hang.ma_loai_khach = loai_khach.ma_loai_khach
	 JOIN view_hop_dong  ON khach_hang.ma_khach_hang = view_hop_dong.ma_khach_hang
ORDER BY
	khach_hang.ma_khach_hang;

drop view view_hop_dong