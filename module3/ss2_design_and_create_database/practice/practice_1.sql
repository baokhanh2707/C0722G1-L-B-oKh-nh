
create database management_student;
use management_student;
create table class (
    class_id int not null auto_increment primary key,
    clas_name varchar(60) not null,
    start_date date not null,
    `status` bit
);

create table student (
    studen_id int not null auto_increment primary key,
    student_name varchar(30) not null,
    address varchar(50),
    phone varchar(20),
	`status` bit,
    class_id int not null,
    foreign key (class_id) references class (class_id)
);
create table `subject` (
    sub_id int not null auto_increment primary key,
    sub_name varchar(30) not null,
    credit tinyint not null default 1 check (Credit >= 1),
	`status` bit default 1
);

create table mark (
    mark_id int not null auto_increment primary key,
    sub_id int not null,
    studen_id int not null,
    mark float default 0 check (mark between 0 and 100),
    exam_times tinyint default 1,
    unique (sub_id , studen_id),
    foreign key (sub_id) references `subject` (sub_id),
    foreign key (studen_id) references student (studen_id)
);