create database quan_ly_ban_hang;
use quan_ly_ban_hang;

CREATE TABLE customer (
    c_id VARCHAR(50) PRIMARY KEY,
    c_name VARCHAR(50),
    c_age INT
);

CREATE TABLE orderr (
    o_id INT PRIMARY KEY,
    c_id VARCHAR(50),
    o_date DATE,
    o_total_price INT,
    FOREIGN KEY (c_id)
        REFERENCES customer (c_id)
);

CREATE TABLE product (
    p_id VARCHAR(50) PRIMARY KEY,
    p_name VARCHAR(50),
    p_price INT
);

CREATE TABLE order_detail (
    o_id INT,
    p_id VARCHAR(50),
    PRIMARY KEY (o_id , p_id),
    FOREIGN KEY (o_id)
        REFERENCES orderr (o_id),
    FOREIGN KEY (p_id)
        REFERENCES product (p_id),
    od_qty VARCHAR(50)
);