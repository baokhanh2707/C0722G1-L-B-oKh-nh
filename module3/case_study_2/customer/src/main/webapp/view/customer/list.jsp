<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 07/11/2022
  Time: 21:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<html>
<head>
    <title>Title</title>
</head>
<body>
<body>
<h1 class="align-bottom text-center">Danh Sách Khách Hàng</h1>
<a href="/customer?action=add" class="btn btn-outline-success my-2 my-sm-0">
    Create
</a>
<form action="/customer?action=search" method="post">
    <input  type="text" placeholder="Search by name" name="name">
    <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="search">
</form>
<%--<a href="/user?action=search">--%>
<%--    Search--%>
<%--</a>--%>

<table class="table" id="tableCustomer">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col">Id type</th>
        <th scope="col">Name</th>
        <th scope="col">Birthday</th>
        <th scope="col">Gender</th>
        <th scope="col">Id Card</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Email</th>
        <th scope="col">Address</th>
        <th scope="col">Xóa</th>
        <th scope="col">Sửa</th>

    </tr>
    </thead>
    <tbody>
    <c:forEach var="customer"  items="${customerList}">
        <tr>
            <td scope="row">${customer.getId()}</td>
            <td>${customer.getIdType()}</td>
            <td>${customer.getName()}</td>
            <td>${customer.getDayOfBirth()}</td>
            <td>${customer.isGender() == true ? "Nam" : "Nữ"} </td>
            <td>${customer.getIdCard()}</td>
            <td>${customer.getPhoneNumber()}</td>
            <td>${customer.getEmail()}</td>
            <td>${customer.getAddress()}</td>
            <td>
                <button onclick="infoDelete(${customer.getId()})" type="button"
                        class="btn btn-outline-success my-2 my-sm-0" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                    Delete
                </button>
            </td>
            <td>
                <a href="/customer?action=edit&id=${customer.getId()}">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Edit</button>
                </a>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <form action="/customer" method="post">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body text-black">
                    <input type="text" hidden name="action" value="delete">
                    <input type="text" hidden id="deleteId" name="deleteId">
                    Are you want to delete this Customer?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close
                    </button>
                    <button type="submit" class="btn btn-danger btnDelete">Delete</button>
                </div>
            </div>
        </div>
    </form>
</div>
</body>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
<script>
    function infoDelete(id) {
        document.getElementById("deleteId").value = id;
    }
</script>



<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
<script src="jquery/jquery-3.5.1.min.js"></script>
<script src="datatables/js/jquery.dataTables.min.js"></script>
<script src="datatables/js/dataTables.bootstrap5.min.js"></script>
<script>
    $(document).ready(function () {
        $('#tableCustomer').dataTable({
            "dom": 'lrtip',
            "lengthChange": false,
            "pageLength": 2
        });
    });
</script>

</html>
