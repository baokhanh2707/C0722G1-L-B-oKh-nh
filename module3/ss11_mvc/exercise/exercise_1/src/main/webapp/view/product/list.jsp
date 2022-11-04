<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 04/11/2022
  Time: 11:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.css">
<script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1 class="align-bottom text-center">Danh Sách Sản Phẩm</h1>
<body>

<table class="table">
    <thead>
    <tr>
        <th scope="col">STT </th>
        <th scope="col">Id Sản Phẩm</th>
        <th scope="col">Tên Sản Phẩm</th>
        <th scope="col">Giá</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="product" items="${productList}">
    <tr>
        <td scope="row">${product.getNumberId()}</td>
        <td>${product.getIdProduct()}</td>
        <td>${product.getNameProduct()}</td>
        <td>${product.getCost}></td>
    </tr>
    </c:forEach>
</table>
</body>
</body>
</html>
