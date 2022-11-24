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
<h1 class="align-bottom text-center">Danh Sách Bệnh Án</h1>

<table class="table" id="tableBenhAn">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col" >Mã bệnh án</th>
        <th hidden scope="col" >Mã bệnh án</th>
        <th scope="col">Mã bệnh nhân</th>
        <th scope="col">Tên Bệnh Nhân</th>
        <th scope="col">Ngày nhập viện</th>
        <th scope="col">Ngày ra viện</th>
        <th scope="col">Lý do nhập viện</th>
        <th scope="col">Xóa</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="benhAn"  items="${benhAnList}" varStatus="status">
        <tr>
            <td scope="row">${status.count}</td>
            <td>${benhAn.getTenBenhAn()}</td>
            <td hidden>${benhAn.getMaBenhAn()}</td>
            <td>${benhAn.getMaBenhNhan()}</td>
            <td>${benhAn.getTenBenhNhan()}</td>
            <td>${benhAn.getNgayNhapVien()} </td>
            <td>${benhAn.getNgayRaVien()}</td>
            <td>${benhAn.getLyDoNhapVien()}</td>
            <td><button onclick="infoDelete(${benhAn.getMaBenhAn()})" type="button"
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
    <form action="/benhAn" method="post">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa bệnh án</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body text-warning">
                    <input type="text" hidden name="action" value="delete">
                    <input type="text" hidden id="deleteId" name="deleteId">
                    Bạn có muốn xóa bệnh án này
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
    function infoDelete(getMaBenhAn) {
        document.getElementById("deleteId").value = getMaBenhAn;
    }
</script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/um...in.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/...in.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
<script src="jquery/jquery-3.5.1.min.js"></script>
<script src="datatables/js/jquery.dataTables.min.js"></script>
<script src="datatables/js/dataTables.bootstrap5.min.js"></script>
<script>
    $(document).ready(function () {
        $('#tableBenhAn').dataTable({
            "dom": 'lrtip',
            "lengthChange": false,
            "pageLength": 3
        });
    });
</script>
</body>
</html>
