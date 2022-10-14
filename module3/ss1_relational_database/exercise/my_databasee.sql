create database my_databasee;
use my_databasee;
create table student(
id int primary key,
name varchar(50)null,
age int null,
country varchar(50)null
);

create table class(
id	int primary key,
name varchar(50)null);

create table teacher(
id int primary key,
name varchar(50)null,
age int null,
country varchar(50)null
);

insert into class(id,`name`)value(1,'khanh');
insert into teacher(id,`name`,age,country)value(1,'quang',27,"đà nẵng");
