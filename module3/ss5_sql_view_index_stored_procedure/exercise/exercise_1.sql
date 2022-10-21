create database  demo;

-- Bước 1: Tạo cơ sở dữ liệu demo

use demo;

-- Bước 2: Tạo bảng Products với các trường dữ liệu sau:

CREATE TABLE products (
    id INT,
    product_code INT PRIMARY KEY,
    product_name VARCHAR(50),
    product_price INT,
    product_amount INT,
    product_description VARCHAR(50),
    product_status VARCHAR(50)
);

-- Chèn một số dữ liệu mẫu cho bảng Products.

insert into  products(id,product_code,product_name,product_price,product_amount,product_description,product_status)
value  (1,1,'lê bảo khánh',1,1,'đẹp trai','bình yên đến đau lòng'),
(2,2,'cẩm vân',2,2,'ròm','thất tình'),(3,3,'lê huy',3,3,'cũng được','ổn');

-- Tạo Unique Index trên bảng Products (sử dụng cột productCode để tạo chỉ mục)

create unique index chi_muc 
on products(product_code);

-- Tạo Composite Index trên bảng Products (sử dụng 2 cột productName và productPrice)

create index composite
on  products(product_name,product_price);

-- Sử dụng câu lệnh EXPLAIN để biết được câu lệnh SQL của bạn thực thi như nào
SELECT 
    *
FROM
    products;
explain select * from products;

-- Tạo view lấy về các thông tin: productCode, productName, productPrice, productStatus từ bảng products.

CREATE VIEW view_thong_tin AS
    SELECT 
        product_code, product_name, product_price, product_status
    FROM
        products;
	
    -- Tiến hành xoá view
    
    drop view view_thong_tin ;
    
    -- Tiến hành sửa đổi view
    
UPDATE view_thong_tin 
SET 
    product_status = 'hát hay'
WHERE
    view_thong_tin.product_code = 1;

-- Tạo store procedure lấy tất cả thông tin của tất cả các sản phẩm trong bảng product

DELIMITER //

CREATE PROCEDURE thong_tin()

BEGIN

  SELECT * FROM products;

END //

DELIMITER ;

call thong_tin();

-- Tạo store procedure thêm một sản phẩm mới

Delimiter //
create procedure add_product()
    begin
    insert into products
    value (4,4,'hà phương',4,4,'bình thường','nhà hơi xa');
   end //
DELIMITER ;

call add_product();

-- Tạo store procedure sửa thông tin sản phẩm theo id

Delimiter //
create procedure update_product(p_id int)
    begin
    update products 
    set products.product_name = 'lê bảo khánh'
    where products.id = p_id;
   end //
DELIMITER ;

call update_product(2);

drop procedure update_product;

-- Tạo store procedure xoá sản phẩm theo id

Delimiter //
create procedure delete_product(p_id int)
    begin
    delete from products
    where products.id = p_id;
   end //
DELIMITER ;

call delete_product(3);

SET SQL_SAFE_UPDATES = 0;



