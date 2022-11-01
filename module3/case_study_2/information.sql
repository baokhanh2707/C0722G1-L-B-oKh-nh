use case_study_2;

insert into `position`(position_id,position_name)
value(1,'Lễ Tân'),
(2,'Phục Vụ'),
(3,'chuyên viên'),
(4,'giám sát'),
(5 ,'quản lý'),
(6,'giám đốc');

insert into education_degree (education_degree_id ,education_degree_name)
value (1,'Trung Cấp'),
(2,'Cao Đẳng'),
(3,'Đại học'),
(4,'Sau Đại Học');

insert into division(division_id ,division_name)
value (1,'Sale – Marketing'),
 (2,'Hành Chính'),
 (3,'Phục vụ'),
 (4,'Quản lý');
 
 insert into customer_type(customer_type_id ,customer_type_name)
 value (1,'Diamond'),
  (2,'Platinium'),
  (3,'Gold'),
  (4,'Silver'),
  (5,'Member');
  
  insert into facility_type(facility_type_id ,facility_type_name )
  value(1,"Villa"),
(2,"House"),
(3,"Room");

insert into rent_type(rent_type_id ,rent_type_name)
value (1,"year"),
(2,"month"),
(3,"day"),
(4,"hour");
 