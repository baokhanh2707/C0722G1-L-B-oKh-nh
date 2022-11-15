<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 14/11/2022
  Time: 23:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Thêm mới thông tin thuê trọ</title>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div>
            <img src="https://www.furama.com/images/LOGOFurama_4C_Normal.png" height="100" width="800"/>
        </div>
        <form class="d-flex">
            <button class="btn btn-outline-warning" type="submit">Log out
            </button>
        </form>
    </div>
</nav>
<nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container">
        <div hidden class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text warning" style="height: 50px">
            </ul>
        </div>
    </div>
</nav>
<body>
<title>Thêm mới phòng trọ</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<c:if test="${mess!=null}">
    <h4 style="color: red">${mess}</h4>
</c:if>

<div>
    <h1 style="text-align: center"> THÊM MỚI PHÒNG TRỌ</h1>
</div>
<a class="btn btn-outline-warning" href="/phongtro">Quay lại list</a>
<form action="/phongtro?action=add" method="post">
    <div>
        <div class="col-8" style="margin-left: 30%">
            <div class="form-floating col-lg-8 mb-3">
                <input required pattern="([A-Z][a-z]+[ ])+([A-Z][a-z]+)" type="text" class="form-control" placeholder="Tên" name="tenNguoiThueTro">
                <label>Tên</label>
            </div>
            <div class="form-floating col-lg-8 mb-3">
                <input required pattern="[0-9]{10}" type="text" class="form-control" placeholder="Số điện thoại" name="SoDienThoai">
                <label>Số điện thoại</label>
            </div>
            <div class="form-group" >
                <label for="birtdDateAdd">Ngày bắt đầu thuê</label>
                <input  name="ngayBatDau" id="birtdDateAdd"  type="date"/>
            </div>
            <div class="form-floating col-lg-8 mb-3">
                <select class="form-select" aria-label="Default select example" id="formInput1"
                        name="maHinhThucThanhToan">
                    <option  selected>Chọn hình thức thanh toán</option>
                    <option value="1">Theo tháng</option>
                    <option value="2">Theo quý</option>
                    <option value="3">Theo năm</option>
                </select>
                <label>Hình thức thanh toán</label>
            </div>
            <div class="form-floating col-lg-8 mb-3">
                <input required pattern="[A-Z][a-z]{0,200}" type="text" class="form-control" placeholder=" Ghi chú" name="ghiChu">
                <label>Ghi chú</label>
            </div>
        </div>
        <div class="d-grid gap-2 col-2 mx-auto">
            <button class="btn btn-success" type="submit">Xong</button>
        </div>
    </div>
</form>
</body>
</html>
