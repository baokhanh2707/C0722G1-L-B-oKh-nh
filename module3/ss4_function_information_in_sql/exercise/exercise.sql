use management_student;

-- Hiển thị tất cả các thông tin môn học (bảng subject) có credit lớn nhất.

SELECT 
    *, MAX(credit)
FROM
    subject;


-- Hiển thị các thông tin môn học có điểm thi lớn nhất. 


SELECT 
    subject.*, MAX(mark.mark) AS max_point
FROM
    subject
        JOIN
    mark ON subject.sub_id = mark.sub_id;

-- Hiển thị các thông tin sinh viên và điểm trung bình của mỗi sinh viên, xếp hạng theo thứ tự điểm giảm dần

SELECT 
    student.*, AVG(mark.mark) AS diem_trung_binh
FROM
    student
        JOIN
    mark ON student.studen_id = mark.studen_id
GROUP BY student.studen_id
ORDER BY diem_trung_binh DESC;