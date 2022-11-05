<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 05/11/2022
  Time: 21:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Product View</h1>
<table class="table">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col">idProduct</th>
        <th scope="col">Tên Sản Phẩm</th>
        <th scope="col">Giá</th>

    </tr>
    </thead>
    <tbody>

    <tr>
        <td scope="row">${product.getNumberID()}</td>
        <td scope="row">${product.getIdProduct()}</td>
        <td scope="row">${product.getNameProduct()}</td>
        <td scope="row">${product.getCost()}</td>

    </tr>
    </tbody>
</table>
</body>
</html>
