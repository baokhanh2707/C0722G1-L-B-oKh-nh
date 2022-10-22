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
     
     SET FOREIGN_KEY_CHECKS=0;
     delete  from khach_hang
     where  ma_khach_hang  IN (SELECT 
        hop_dong.ma_khach_hang
    FROM
        hop_dong
    WHERE
        YEAR(hop_dong.ngay_lam_hop_dong) < '2021' );
        
       --  task 19
       set sql_safe_updates = 0;
	UPDATE dich_vu_di_kem 
SET 
    gia = gia * 2
WHERE
    (SELECT 
            *
        FROM
            (SELECT 
                SUM(hop_dong_chi_tiet.so_luong) AS so_lan_su_dung
            FROM
                hop_dong_chi_tiet
            JOIN dich_vu_di_kem ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
            JOIN hop_dong ON hop_dong_chi_tiet.ma_hop_dong = hop_dong.ma_hop_dong
            WHERE
                YEAR(hop_dong.ngay_lam_hop_dong) = '2020'
            GROUP BY dich_vu_di_kem.ma_dich_vu_di_kem
            HAVING so_lan_su_dung > 10) AS x);
    

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
    khach_hang ;
     
  --   task 21
  
 create view v_nhan_vien as
 select nhan_vien.*   from nhan_vien
join hop_dong on nhan_vien.ma_nhan_vien =  hop_dong.ma_nhan_vien
 where (hop_dong.ngay_lam_hop_dong) between '2021-04-01' and '2021-04-30' and nhan_vien.dia_chi like '% Đà Nẵng' ;

 SELECT * FROM v_nhan_vien;
drop view v_nhan_vien;

-- task 22
set sql_safe_updates = 0;
UPDATE nhan_vien 
SET 
    dia_chi = 'Liên Chiểu , Đà Nẵng'
WHERE ma_nhan_vien in ( select * from( select v_nhan_vien.ma_nhan_vien from v_nhan_vien) as a);
    
-- task 23 

Delimiter //
create procedure sp_xoa_khach_hang(ma_khach_hang  int)
    begin
    delete from khach_hang
    where khach_hang.ma_khach_hang = ma_khach_hang;
   end //
DELIMITER ;

call sp_xoa_khach_hang (3)

-- task 24

Delimiter //
create procedure sp_them_moi_hop_dong ()
    begin
    insert into hop_dong 
    value (13,'2022-04-01','2022-04-30',0,10,10,6);
   end //
DELIMITER ;

call sp_them_moi_hop_dong ()