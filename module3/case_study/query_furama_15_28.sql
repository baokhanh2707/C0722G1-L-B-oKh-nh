use furama_resort;

-- task 16

DELETE FROM nhan_vien 
WHERE
    nhan_vien.ma_nhan_vien NOT IN (SELECT 
        hop_dong.ma_nhan_vien
    FROM
        hop_dong
    
    WHERE
        YEAR(hop_dong.ngay_lam_hop_dong) BETWEEN '2019' AND '2021');

  set sql_safe_updates = 0;
  
  select*from nhan_vien;
  
 --  task 17
 set sql_safe_updates = 0;
 UPDATE khach_hang 
SET 
    ma_loai_khach = 1
WHERE
    khach_hang.ma_khach_hang in (select*from (select mkh from view_tong_tien) as b ) ;
        
            set sql_safe_updates = 1;
            select*from khach_hang;
            
            
         CREATE VIEW view_tong_tien AS
    (SELECT 
        mkh, SUM(a.tong_tien) AS tong_chi_phi
    FROM
        (SELECT 
            hop_dong.ma_khach_hang AS mkh,
                hop_dong.ma_hop_dong,
                dich_vu.ten_dich_vu,
                hop_dong.ngay_lam_hop_dong,
                hop_dong.ngay_ket_thuc,
                loai_khach.ten_loai_khach,
                IFNULL(dich_vu.chi_phi_thue, 0) + SUM(IFNULL(dich_vu_di_kem.gia, 0) * IFNULL(hop_dong_chi_tiet.so_luong, 0)) AS tong_tien
        FROM
            hop_dong
		LEFT JOIN khach_hang on hop_dong.ma_khach_hang = khach_hang.ma_khach_hang
        LEFT JOIN loai_khach on loai_khach.ma_loai_khach = khach_hang.ma_loai_khach
        LEFT JOIN hop_dong_chi_tiet ON hop_dong.ma_hop_dong = hop_dong_chi_tiet.ma_hop_dong
        LEFT JOIN dich_vu_di_kem ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
        LEFT JOIN dich_vu ON dich_vu.ma_dich_vu = hop_dong.ma_dich_vu
        WHERE
            YEAR(hop_dong.ngay_lam_hop_dong) = 2021 and loai_khach.ma_loai_khach = 2
        GROUP BY hop_dong.ma_hop_dong
        HAVING (tong_tien) > 1000000) AS a
        group by mkh
        );
        
     --    task 18
     set sql_safe_updates = 0;
     SET FOREIGN_KEY_CHECKS=0;
     delete  from khach_hang
     where  ma_khach_hang  IN (SELECT 
        hop_dong.ma_khach_hang
    FROM
        hop_dong
    WHERE
        YEAR(hop_dong.ngay_lam_hop_dong) < '2021' );
        
       --  task 19
       
	update dich_vu_di_kem 
    set gia = gia *2
    where (select*from (select  sum(hop_dong_chi_tiet.so_luong) as so_lan_su_dung from hop_dong_chi_tiet 
    join dich_vu_di_kem on dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
    join hop_dong on hop_dong_chi_tiet.ma_hop_dong=hop_dong.ma_hop_dong
    where year(hop_dong.ngay_lam_hop_dong) = '2020' 
    group by dich_vu_di_kem.ma_dich_vu_di_kem
    having so_lan_su_dung > 10 ) as x
    );
    

     -- task 20
     
    SELECT 
    ma_nhan_vien,
    ho_ten,
    email,
    so_dien_thoai,
    ngay_sinh,
    dia_chi
FROM
    nhan_vien 
UNION SELECT 
    ma_khach_hang,
    ho_ten,
    email,
    so_dien_thoai,
    ngay_sinh,
    dia_chi
FROM
    khach_hang
    
          

