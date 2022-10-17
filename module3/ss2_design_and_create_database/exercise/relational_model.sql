create database relational_model;
use relational_model;
create table phieu_xuat (
    so_phieu_xuat int primary key,
    ngay_xuat date
);

create table vat_tu(
ma_vat_tu int primary key,
ten_vat_tu varchar(50)
);

create table chi_tiet_phieu_xuat (
    so_luong_san_xuat int,
    don_gia_xuat int,
    primary key (so_phieu_xuat , ma_vat_tu),
    so_phieu_xuat int,
    ma_vat_tu int,
    foreign key (so_phieu_xuat)
        references phieu_xuat (so_phieu_xuat),
    foreign key (ma_vat_tu)
        references vat_tu (ma_vat_tu)
);

create table phieu_nhap (
    so_phieu_nhap int primary key,
    ngay_nhap date
);

create table chi_tiet_phieu_nhap (
    don_gia_nhap int,
    so_luong_nhap int,
    primary key (ma_vat_tu , so_phieu_nhap),
    ma_vat_tu int,
    so_phieu_nhap int,
    foreign key (so_phieu_nhap)
        references phieu_nhap (so_phieu_nhap),
    foreign key (ma_vat_tu)
        references vat_tu (ma_vat_tu)
);
create table so_dien_thoai (
    so_dien_thoai_id int primary key,
    so_dien_thoai varchar(50)
);
    
    create table nha_cung_cap (
    ma_nha_cung_cap int primary key,
    ten_nha_cung_cap varchar(50),
    dia_chi varchar(50),
    so_dien_thoai_id int,
    foreign key (so_dien_thoai_id)
        references so_dien_thoai (so_dien_thoai_id)
);
create table don_dat_hang (
    so_don_hang int primary key,
    ngay_dat_hang date,
    ma_nha_cung_cap int,
    foreign key (ma_nha_cung_cap)
        references nha_cung_cap (ma_nha_cung_cap)
);
create table chi_tiet_don_dat_hang (
    primary key (ma_vat_tu , so_don_hang),
    so_don_hang int,
    ma_vat_tu int,
    foreign key (so_don_hang)
        references don_dat_hang (so_don_hang),
    foreign key (ma_vat_tu)
        references vat_tu (ma_vat_tu)
);

