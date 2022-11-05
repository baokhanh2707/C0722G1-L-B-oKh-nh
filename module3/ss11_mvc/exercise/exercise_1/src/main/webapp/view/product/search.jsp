<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 05/11/2022
  Time: 22:59
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
<h1>Search Product</h1>
<a href="/product">Quay lại list</a>

<form action="/product?action=search" method="post">
    <pre>Tên Sản Phẩm:   <input type="text" name="name"></pre>
    <pre>               <button>Search</button></pre>
</form>

<table class="table">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col">NameProduct</th>
        <th scope="col">Giá</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="product" items="${products}">
        <tr>
            <c:forEach var="product" items="${products}">
                <td scope="row">${product.getNumberID()}</td>
                <td scope="row">${product.getNameProduct()}</td>
                <td scope="row">${product.getCost()}</td>
            </c:forEach>
        </tr>
    </c:forEach>

    </tbody>
</table>
</body>
</html>
