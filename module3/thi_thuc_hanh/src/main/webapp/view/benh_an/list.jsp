<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 15/11/2022
  Time: 21:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<html>
<head>
    <title>Title</title>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light " >
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
<h1 class="align-bottom text-center">Danh Sách Phòng Trọ</h1>
<a href="/phongtro?action=add" class="btn btn-outline-warning my-2 my-sm-0">
    Create
</a>
<form action="/phongtro?action=searchName" method="post">
    <input  type="text" placeholder="theo tên người thuê" name="tenNguoiThueTro">
    <input class="btn btn-outline-warning my-2 my-sm-0" type="submit" value="search">
</form>
<form action="/phongtro?action=searchId" method="post">
    <input  type="text" placeholder="theo mã phòng trọ" name="maPhongTro">
    <input class="btn btn-outline-warning my-2 my-sm-0" type="submit" value="search">
</form>
<table class="table" id="tableThuePhongTro">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col" >Mã Phòng Trọ</th>
        <th scope="col">Tên Người Thuê Trọ</th>
        <th scope="col">Số điện thoại</th>
        <th scope="col">Ngày Bắt Đầu Thuê</th>
        <th scope="col">Hình Thức Thanh Toán</th>
        <th scope="col">Ghi Chú</th>
        <th scope="col">Xóa</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="thue"  items="${thuePhongTroList}" varStatus="status">
        <tr>
            <td scope="row">${status.count}</td>
            <td>${thue.getMaPhongTro()}</td>
            <td>${thue.getTenNguoiThueTro()}</td>
            <td>${thue.getSoDienThoai()}</td>
            <td>${thue.getNgayBatDau()} </td>
            <td>${thue.getTenHinhThucThanhToan()}</td>
            <td>${thue.getGhiChu()}</td>
            <td><button onclick="infoDelete(${thue.getMaPhongTro()})" type="button"
                        class="btn btn-outline-warning my-2 my-sm-0" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                Delete
            </button></td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <form action="/phongtro" method="post">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa phòng trọ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body text-warning">
                    <input type="text" hidden name="action" value="delete">
                    <input type="text" hidden id="deleteId" name="deleteId">
                    Bạn có muốn xóa phòng trọ này
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close
                    </button>
                    <button type="submit" class="btn btn-warning btnDelete">Delete</button>
                </div>
            </div>
        </div>
    </form>
</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
<script>
    function infoDelete(maPhongTro) {
        document.getElementById("deleteId").value = maPhongTro;
    }
</script>

</body>


</html>
