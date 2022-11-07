<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 05/11/2022
  Time: 22:59
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
<h1>Trang tìm kiếm </h1>
<a href="/product">Quay lại list</a>

<form action="/product?action=search" method="post">
    <pre>Tên Sản Phẩm:<input type="text" name="nameProduct"></pre>
    <pre><button>Search</button></pre>
    <table class="table">

        <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá</th>

        </tr>

        <c:forEach var='product' items='${findProductList}' varStatus="status">
            <tr>
                <td scope="row">${status.count}</td>
                <td>${product.getNameProduct()}</td>
                <td>${product.getCost()}</td>
            </tr>
        </c:forEach>

    </table>
</form>
</body>
</html>
