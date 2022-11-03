<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 03/11/2022
  Time: 11:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<html>
<head>
    <title>Title</title>
</head>
<h1 class="align-bottom text-center">Danh Sách Khách Hàng</h1>
<body>

<table class="table">
    <thead>
    <tr>
        <th scope="col">Tên </th>
        <th scope="col">Ngày sinh</th>
        <th scope="col">Địa Chỉ</th>
        <th scope="col">Hình ảnh</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="customer" items="${customerList}">
    <tr>
        <td scope="row">${customer.getName()}</td>
        <td>${customer.getBirthday()}</td>
        <td>${customer.getAddress()}</td>
        <td><img src="${customer.getPicture()} "width="80"height="80"></td>
    </tr>
    </c:forEach>
</table>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</html>
