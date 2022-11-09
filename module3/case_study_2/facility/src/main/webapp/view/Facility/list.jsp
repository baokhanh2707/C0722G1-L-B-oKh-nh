<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 09/11/2022
  Time: 00:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1 class="align-bottom text-center">Danh Sách Khách Hàng</h1>
<a href="/customer?action=add" class="btn btn-outline-success my-2 my-sm-0">
    Create
</a>
<%--<a href="/user?action=search">--%>
<%--    Search--%>
<%--</a>--%>

<table class="table">
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
        <th scope="col">Xóa </th>

    </tr>
    </thead>
    <tbody>
    <c:forEach var="customer" items="${customerList}">
    <tr>
        <td scope="row">${customer.getId()}</td>
        <td>${customer.getIdType()}</td>
        <td>${customer.getName()}</td>
        <td>${customer.getDayOfBirth()}</td>
        <td>${customer.getGender()}</td>
        <td>${customer.getIdCard()}</td>
        <td>${customer.getPhoneNumber()}</td>
        <td>${customer.getEmail()}</td>
        <td>${customer.getAddress()}</td>
        <td><button onclick="infoDelete(${customer.getId()})" type="button" class="btn btn-outline-success my-2 my-sm-0" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
            Delete
        </button>
        </td>
    </tr>
    </c:forEach>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</html>
