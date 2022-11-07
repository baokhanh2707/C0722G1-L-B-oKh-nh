create database `user`;

use  `user`;

create table `user` (
 id  int(3) primary key AUTO_INCREMENT,
 `name` varchar(120) ,
 email varchar(220),
 country varchar(120)
);

insert into `user`(name, email, country) values('Minh','minh@codegym.vn','Viet Nam');
insert into `user`(name, email, country) values('Kante','kante@che.uk','Kenia');

