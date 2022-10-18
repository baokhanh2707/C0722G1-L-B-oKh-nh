USE QuanLySinhVien;

select * from student
where StudentName like 'h%';

select * from class
where  MONTH(StartDate)=12;

select * from subject
where  Credit between 3 and 5;

update student
set StudentName="Hung"
where ClassId=2;

select * from student, mark , subject
 order by Mark desc,StudentName asc;