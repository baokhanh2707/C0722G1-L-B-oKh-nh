use furama_resort;

-- task 6
SELECT 
    hop_dong.ma_dich_vu,
    dich_vu.ten_dich_vu,
    dich_vu.dien_tich,
    dich_vu.chi_phi_thue,
    loai_dich_vu.ten_loai_dich_vu
FROM
    dich_vu
        JOIN
    loai_dich_vu ON loai_dich_vu.ma_loai_dich_vu = dich_vu.ma_loai_dich_vu
        JOIN
    hop_dong ON hop_dong.ma_dich_vu = dich_vu.ma_dich_vu
WHERE
    dich_vu.ma_dich_vu NOT IN (SELECT 
            hop_dong.ma_dich_vu
        FROM
            hop_dong
        WHERE
            hop_dong.ngay_lam_hop_dong BETWEEN '2021-01-01' AND '2021-03-31')
GROUP BY dich_vu.ma_dich_vu;

-- task 7
SELECT 
    hop_dong.ma_dich_vu,
    dich_vu.ten_dich_vu,
    dich_vu.dien_tich,
    dich_vu.so_nguoi_toi_da,
    dich_vu.chi_phi_thue,
    loai_dich_vu.ten_loai_dich_vu
FROM
    dich_vu
        JOIN
    loai_dich_vu ON loai_dich_vu.ma_loai_dich_vu = dich_vu.ma_loai_dich_vu
        JOIN
    hop_dong ON hop_dong.ma_dich_vu = dich_vu.ma_dich_vu
WHERE
    YEAR(hop_dong.ngay_lam_hop_dong) = '2020'
        AND dich_vu.ma_dich_vu NOT IN (SELECT 
            hop_dong.ma_dich_vu
        FROM
            hop_dong
        WHERE
            YEAR(hop_dong.ngay_lam_hop_dong) = '2021')
GROUP BY dich_vu.ma_dich_vu;
           
      -- task 8     
      -- cách 1
      SELECT 
    khach_hang.ho_ten
FROM
    khach_hang
GROUP BY khach_hang.ho_ten;
      
      -- cách 2
      SELECT DISTINCT
    khach_hang.ho_ten
FROM
    khach_hang;
      
     --  cách 3
     SELECT 
    khach_hang.ho_ten
FROM
    khach_hang 
UNION SELECT 
    khach_hang.ho_ten
FROM
    khach_hang;
     
     -- task 9
     
     SELECT 
    MONTH(hop_dong.ngay_lam_hop_dong) AS thang,
    COUNT(hop_dong.ma_khach_hang) AS so_luong_khach_hang
FROM
    hop_dong
WHERE
    (YEAR(hop_dong.ngay_lam_hop_dong) = '2021')
GROUP BY MONTH(hop_dong.ngay_lam_hop_dong)
ORDER BY MONTH(hop_dong.ngay_lam_hop_dong);
     
     -- task 10
     
     SELECT 
    hop_dong.ma_hop_dong,
    hop_dong.ngay_lam_hop_dong,
    hop_dong.ngay_ket_thuc,
    hop_dong.tien_dat_coc,
    IFNULL(SUM(hop_dong_chi_tiet.so_luong), 0) AS so_luong_dich_vu_di_kem
FROM
    hop_dong
        LEFT JOIN
    hop_dong_chi_tiet ON hop_dong.ma_hop_dong = hop_dong_chi_tiet.ma_hop_dong
GROUP BY hop_dong.ma_hop_dong;
     
     