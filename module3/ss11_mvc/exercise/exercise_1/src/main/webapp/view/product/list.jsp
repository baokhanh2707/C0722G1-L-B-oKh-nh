<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 04/11/2022
  Time: 11:16
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
<h1 class="align-bottom text-center">Danh Sách Sản Phẩm</h1>
<a href="/product?action=search">
    Search
</a>
<table class="table">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Sản Phẩm</th>
        <th scope="col">Giá</th>
        <th scope="col">Thêm mới</th>
        <th scope="col">Sửa thông tin</th>
        <th scope="col">Xóa sản phẩm</th>
        <th scope="col">Xem thông tin chi tiết</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="product" items="${productList}">
    <tr>
        <td scope="row">${product.getNumberID()}</td>
        <td>${product.getNameProduct()}</td>
        <td>${product.getCost()}</td>
        <td>
            <a href="/product?action=add">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Create</button>
            </a>
        </td>
        <td>
            <a href="/product?action=edit&idProduct=${product.getIdProduct()}">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Edit</button>
            </a>
        </td>
        <td>
            <a href="/product?action=delete&idProduct=${product.getIdProduct()}">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Delete</button>
            </a>
        </td>
        <td><a href="/product?action=view&idProduct=${product.getIdProduct()}">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">View</button>
        </a></td>
    </tr>
    </c:forEach>
</table>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
</body>
</html>
