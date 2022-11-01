create database case_study_2;

use  case_study_2;

create table `position` (
position_id int primary key,
position_name varchar(45)
);

create table education_degree(
education_degree_id int primary key,
education_degree_name varchar(45)
);

create table division (
division_id int primary key,
division_name varchar(45)
);

create table employee(
employee_id int primary key,
employee_name varchar(45),
employee_date_of_birth date ,
employee_id_card varchar(45),
employee_salary double ,
employee_phone_number varchar(45),
employee_email varchar (45),
employee_address varchar(45),
position_id int ,
education_degree_id int,
division_id int,
user_name varchar(255),
foreign key (position_id) references `position`(position_id),
foreign key (education_degree_id) references education_degree(education_degree_id),
foreign key (division_id) references division(division_id),
foreign key (user_name) references `user`(user_name)
);

create table `user`(
user_name varchar(255) primary key,
`password` varchar(255)
);

create table `role`(
role_id int primary key,
role_name varchar(255)
);

create table user_role(
role_id int,
user_name varchar(255),
foreign key (role_id) references `role`(role_id),
foreign key (user_name) references `user`(user_name)
);

create table customer (
customer_id int primary key ,
customer_type_id int,
customer_name varchar(45),
customer_day_of_birth date,
customer_gender bit(1),
customer_id_card varchar(45),
customer_phone_number varchar(45),
customer_email varchar(45),
customer_address varchar(45),
foreign key (customer_type_id) references customer_type(customer_type_id)
);

create table customer_type(
customer_type_id int primary key,
customer_type_name varchar(45)
);

create table attach_facility(
attach_facility_id int primary key,
attach_facility_name varchar(45),
attach_facility_cost double,
attach_facility_unit varchar(10),
attach_facility_status varchar(45)
);

create table facility_type(
facility_type_id int primary key ,
facility_type_name varchar(45)
);

create table rent_type(
rent_type_id int primary key ,
rent_type_name varchar(45)
);

create table facility(
facility_id int primary key,
facility_name varchar(45),
facility_area int,
facility_cost double,
facility_max_people int,
rent_type_id int ,
facility_type_id int,
facility_standard_room varchar(45),
description_other_convenience varchar(45),
facility_pool_area double,
facility_number_of_floors int,
facility_free text,
foreign key (rent_type_id) references rent_type(rent_type_id),
foreign key (facility_type_id) references facility_type(facility_type_id)
);

create table contract(
contract_id int primary key,
contract_start_date datetime,
contract_end_date datetime,
contract_deposit double,
employee_id int,
customer_id int,
facility_id int,
foreign key (employee_id) references employee(employee_id),
foreign key (customer_id) references customer(customer_id),
foreign key (facility_id) references facility(facility_id)
);

create table contract_detail(
contract_detail_id int,
contract_id int,
attach_facility_id int,
contract_detail_quantity int,
foreign key(contract_id) references contract(contract_id),
foreign key(attach_facility_id) references attach_facility(attach_facility_id)
);