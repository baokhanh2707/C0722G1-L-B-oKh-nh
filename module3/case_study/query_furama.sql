use furama_resort;
SELECT 
    *
FROM
    nhan_vien
WHERE
    ho_ten LIKE 'H%' OR ho_ten LIKE 'T%'
        OR ho_ten LIKE 'K%'
        AND CHAR_LENGTH(ho_ten) <= 15;

SELECT 
    *
FROM
    khach_hang
WHERE
    dia_chi REGEXP '(Đà Nẵng|Quảng Trị)'
        AND TIMESTAMPDIFF(YEAR, ngay_sinh, NOW()) BETWEEN 18 AND 50;

select * from khach_hang;
  
  
SELECT 
    khach_hang.ma_khach_hang,
    khach_hang.ho_ten,
    COUNT(hop_dong.ma_khach_hang) AS so_lan_dat_phong
FROM
    khach_hang
        JOIN
    hop_dong ON khach_hang.ma_khach_hang = hop_dong.ma_khach_hang
        JOIN
    loai_khach ON loai_khach.ma_loai_khach = khach_hang.ma_loai_khach
WHERE
    loai_khach.ten_loai_khach = 'Diamond'
GROUP BY ma_khach_hang
ORDER BY so_lan_dat_phong;
select * from dich_vu,dich_vu_di_kem,hop_dong_chi_tiet;

CREATE VIEW view_hop_dong AS
    SELECT 
        hop_dong.ma_khach_hang,
        hop_dong.ma_hop_dong,
        dich_vu.ten_dich_vu,
        hop_dong.ngay_lam_hop_dong,
        hop_dong.ngay_ket_thuc,
        (dich_vu.chi_phi_thue + SUM(dich_vu_di_kem.gia * hop_dong_chi_tiet.so_luong)) AS tong_tien
    FROM
        hop_dong
           left JOIN
        hop_dong_chi_tiet ON hop_dong.ma_hop_dong = hop_dong_chi_tiet.ma_hop_dong
           left JOIN
        dich_vu_di_kem ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
           left JOIN
        dich_vu ON dich_vu.ma_dich_vu = hop_dong.ma_dich_vu
    GROUP BY hop_dong.ma_hop_dong;


SELECT 
    khach_hang.ma_khach_hang,
    khach_hang.ho_ten,
    loai_khach.ten_loai_khach,
    view_hop_dong.*
FROM
    khach_hang
       left JOIN
    loai_khach ON khach_hang.ma_loai_khach = loai_khach.ma_loai_khach
       left JOIN
    view_hop_dong ON khach_hang.ma_khach_hang = view_hop_dong.ma_khach_hang
ORDER BY khach_hang.ma_khach_hang;

drop view view_hop_dong