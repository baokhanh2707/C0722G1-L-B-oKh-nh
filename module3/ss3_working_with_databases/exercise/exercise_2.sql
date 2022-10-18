use quan_ly_ban_hang;

insert into customer(c_id,c_name,c_age)value(1,"Minh Quan",10),(2,"Ngoc Oanh",20),(3,"Hong ha",50);

insert into orderr(o_id,c_id,o_date,o_total_price)
value(1,"1","2006-03-21",null),(2,"2","2006-03-23",null),(3,"1","2003-03-16",null);


insert into product(p_id,p_name,p_price)
value(1,"May Giat",3),(2,"Tu Lanh",5),(3,"Dieu Hoa",7),(4,"Quat",1),(5,"Bep Dien",2);

insert into order_detail(o_id,p_id,od_qty)
value(1,"1","3"),(1,"3","7"),(1,"4","2"),(2,"1","1"),(3,"1","8"),(2,"5","4"),(2,"3","3");


SELECT 
    *
FROM
    orderr;

SELECT 
    *
FROM
    customer
        JOIN
    orderr ON customer.c_id = orderr.c_ID
        JOIN
    order_detail ON orderr.o_id = order_detail.o_id
        JOIN
    product ON order_detail.p_id = product.p_id;
    
  SELECT 
    c_name
FROM
    customer
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            orderr
        WHERE
            customer.c_id = orderr.c_id);

SELECT 
    orderr.o_id,
    orderr.o_date,
    order_detail.od_qty * product.p_price AS o_total_price
FROM
    orderr
        JOIN
    order_detail ON orderr.o_id = order_detail.o_id
        JOIN
    product ON order_detail.p_id = product.p_id;
