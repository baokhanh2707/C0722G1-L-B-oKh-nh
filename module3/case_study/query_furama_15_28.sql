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
        LEFT JOIN khach_hang ON hop_dong.ma_khach_hang = khach_hang.ma_khach_hang
        LEFT JOIN loai_khach ON loai_khach.ma_loai_khach = khach_hang.ma_loai_khach
        LEFT JOIN hop_dong_chi_tiet ON hop_dong.ma_hop_dong = hop_dong_chi_tiet.ma_hop_dong
        LEFT JOIN dich_vu_di_kem ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
        LEFT JOIN dich_vu ON dich_vu.ma_dich_vu = hop_dong.ma_dich_vu
        WHERE
            YEAR(hop_dong.ngay_lam_hop_dong) = 2021
                AND loai_khach.ma_loai_khach = 2
        GROUP BY hop_dong.ma_hop_dong
        HAVING (tong_tien) > 1000000) AS a
    GROUP BY mkh);
        
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
UNION all SELECT 
    ma_khach_hang,
    ho_ten,
    email,
    so_dien_thoai,
    ngay_sinh,
    dia_chi
FROM
    khach_hang ;
     
  --   task 21
  
 CREATE VIEW v_nhan_vien AS
    SELECT 
        nhan_vien.*
    FROM
        nhan_vien
            JOIN
        hop_dong ON nhan_vien.ma_nhan_vien = hop_dong.ma_nhan_vien
    WHERE
        (hop_dong.ngay_lam_hop_dong) BETWEEN '2021-04-01' AND '2021-04-30'
            AND nhan_vien.dia_chi LIKE '% Đà Nẵng';

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
create procedure sp_them_moi_hop_dong (id int, ngay_lam_hop_dong datetime, ngay_ket_thuc datetime, tien_dat_coc double, ma_nhan_vien int, ma_khach_hang int, ma_dich_vu int)
    begin
    insert into hop_dong 
    value (id,ngay_lam_hop_dong, ngay_ket_thuc, tien_dat_coc,ma_nhan_vien,ma_khach_hang, ma_dich_vu);
   end //
DELIMITER ;

call sp_them_moi_hop_dong (14,'2022-05-02','2022-08-12',0,10,10,6);
drop procedure sp_them_moi_hop_dong;
-- task 25
SET FOREIGN_KEY_CHECKS=0;
create table so_luong_hop_dong_sau_khi_xoa (
so_luong int
);
delimiter //
create trigger tr_xoa_hop_dong
after delete on hop_dong for each row
begin  
insert into so_luong_hop_dong_sau_khi_xoa 
select count(*) from hop_dong;
end //
delimiter ;
drop  trigger tr_xoa_hop_dong;
DELETE FROM hop_dong 
WHERE
    ma_hop_dong = 10;
select * from  so_luong_hop_dong_sau_khi_xoa;

-- task 26

SET FOREIGN_KEY_CHECKS=0;
delimiter //
create trigger tr_cap_nhat_hop_dong 
before update on hop_dong for each row
begin  
if(datediff(new.ngay_ket_thuc, old.ngay_lam_hop_dong)  < 2  )  then
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày kết thúc hợp đồng phải lớn hơn ngày làm hợp đồng ít nhất là 2 ngày';
  END IF;
end //
delimiter ; 
drop trigger tr_cap_nhat_hop_dong ;
update hop_dong set ngay_ket_thuc = "2021-06-05" where hop_dong.ma_hop_dong=6;

-- task 27
-- ý a 

CREATE VIEW result AS
    SELECT 
        dich_vu.ma_dich_vu
    FROM
        dich_vu
            JOIN
        hop_dong ON hop_dong.ma_dich_vu = dich_vu.ma_dich_vu
    GROUP BY dich_vu.ma_dich_vu
    HAVING SUM(dich_vu.chi_phi_thue) > 2000000;

delimiter //
create function func_dem_dich_vu ()
returns int
deterministic
begin 
 return ( select count(ma_dich_vu) from result)  ;
end //
delimiter ; 

select  func_dem_dich_vu () ;
drop function func_dem_dich_vu ;
drop view result;

-- ý b
create view thoi_gian as 
select hop_dong.ma_hop_dong , khach_hang.ma_khach_hang , DATEDIFF(ngay_ket_thuc,ngay_lam_hop_dong) as ket_qua  from hop_dong 
left join  khach_hang on khach_hang.ma_khach_hang = hop_dong.ma_khach_hang 

delimiter //
create function func_tinh_thoi_gian_hop_dong(ma_kh int)
returns int
deterministic
begin
declare max INT;
set max=(select max(ket_qua) from thoi_gian where thoi_gian.ma_khach_hang = ma_kh);
return max;
end //
delimiter ; 
drop function func_tinh_thoi_gian_hop_dong;
set sql_safe_updates = 0;
select func_tinh_thoi_gian_hop_dong(2);
drop view thoi_gian;

-- task 28

