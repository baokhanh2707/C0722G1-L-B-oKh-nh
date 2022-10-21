use furama_resort;

-- task 11 

	select dich_vu_di_kem.ma_dich_vu_di_kem,dich_vu_di_kem.ten_dich_vu_di_kem from dich_vu_di_kem
	join hop_dong_chi_tiet on hop_dong_chi_tiet.ma_dich_vu_di_kem =  dich_vu_di_kem.ma_dich_vu_di_kem
	join hop_dong on hop_dong_chi_tiet.ma_hop_dong = hop_dong.ma_hop_dong
	join khach_hang on khach_hang.ma_khach_hang = hop_dong.ma_khach_hang
	join loai_khach on loai_khach.ma_loai_khach = khach_hang.ma_loai_khach
	-- where loai_khach.ten_loai_khach = ('Diamond') and khach_hang.dia_chi like "%Vinh" or khach_hang.dia_chi like  "%Quảng Ngãi"
    where loai_khach.ten_loai_khach = ('Diamond') and khach_hang.dia_chi  REGEXP '(Vinh|Quảng Ngãi)';
    
  --   task 12
  
  select hop_dong.ma_hop_dong,nhan_vien.ho_ten as ho_ten_nhan_vien,khach_hang.ho_ten as ho_ten_khach_hang,khach_hang.so_dien_thoai,dich_vu.ma_dich_vu,dich_vu.ten_dich_vu,ifnull(SUM(hop_dong_chi_tiet.so_luong),0) AS so_luong_dich_vu_di_kem ,hop_dong.tien_dat_coc 
  from hop_dong
  left join khach_hang on khach_hang.ma_khach_hang = hop_dong.ma_khach_hang
  left join dich_vu on dich_vu.ma_dich_vu = hop_dong.ma_dich_vu
  left join hop_dong_chi_tiet on hop_dong_chi_tiet.ma_hop_dong = hop_dong.ma_hop_dong
  left join nhan_vien on nhan_vien.ma_nhan_vien = hop_dong.ma_nhan_vien
   where   hop_dong.ngay_lam_hop_dong BETWEEN '2020-09-01' AND '2020-12-31'
        AND dich_vu.ma_dich_vu NOT IN (SELECT 
            hop_dong.ma_dich_vu
        FROM
            hop_dong
        WHERE
			hop_dong.ngay_lam_hop_dong BETWEEN '2021-01-01' AND '2021-06-31'
    )
    group by khach_hang.ho_ten ;
    
   --  task 13
   
	 SELECT 
		dich_vu_di_kem.ma_dich_vu_di_kem,
		dich_vu_di_kem.ten_dich_vu_di_kem,
		SUM(hop_dong_chi_tiet.so_luong) AS so_luong_dich_vu_di_kem
	FROM
		hop_dong 
			LEFT JOIN
		hop_dong_chi_tiet  ON hop_dong_chi_tiet.ma_hop_dong = hop_dong.ma_hop_dong
			JOIN
		dich_vu_di_kem  ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
	GROUP BY dich_vu_di_kem.ma_dich_vu_di_kem
	HAVING SUM(hop_dong_chi_tiet.so_luong) >= ALL (SELECT 
			SUM(hop_dong_chi_tiet.so_luong)
		FROM
			hop_dong_chi_tiet 
		GROUP BY hop_dong_chi_tiet.ma_dich_vu_di_kem);

-- task 14

SELECT 
    hop_dong.ma_hop_dong,
    loai_dich_vu.ten_loai_dich_vu,
    dich_vu_di_kem.ten_dich_vu_di_kem,
    COUNT(dich_vu_di_kem.ma_dich_vu_di_kem) AS so_lan_su_dung
FROM
    hop_dong
        JOIN
    hop_dong_chi_tiet ON hop_dong_chi_tiet.ma_hop_dong = hop_dong.ma_hop_dong
        JOIN
    dich_vu_di_kem ON dich_vu_di_kem.ma_dich_vu_di_kem = hop_dong_chi_tiet.ma_dich_vu_di_kem
        JOIN
    dich_vu ON dich_vu.ma_dich_vu = hop_dong.ma_dich_vu
        JOIN
    loai_dich_vu ON loai_dich_vu.ma_loai_dich_vu = dich_vu.ma_loai_dich_vu
GROUP BY dich_vu_di_kem.ten_dich_vu_di_kem
HAVING so_lan_su_dung = 1
ORDER BY hop_dong.ma_hop_dong;

-- task 15

SELECT 
    nhan_vien.ma_nhan_vien,
    nhan_vien.ho_ten,
    trinh_do.ten_trinh_do,
    bo_phan.ten_bo_phan,
    nhan_vien.so_dien_thoai,
    nhan_vien.dia_chi
FROM
    nhan_vien
        JOIN
    hop_dong ON hop_dong.ma_nhan_vien = nhan_vien.ma_nhan_vien
    join bo_phan on bo_phan.ma_bo_phan = nhan_vien.ma_bo_phan
    join trinh_do on trinh_do.ma_trinh_do=nhan_vien.ma_trinh_do
    
where YEAR(hop_dong.ngay_lam_hop_dong) BETWEEN '2020' AND '2021'
GROUP BY nhan_vien.ho_ten
  having COUNT(hop_dong.ma_nhan_vien) <= 3 
  order by nhan_vien.ma_nhan_vien;
     
    



