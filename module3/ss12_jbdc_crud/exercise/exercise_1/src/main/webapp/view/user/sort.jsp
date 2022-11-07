<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 07/11/2022
  Time: 16:51
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
<h1 class="align-bottom text-center">Danh Sách Người Dùng Sau khi sắp xếp</h1>

<table class="table">
    <thead>
    <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Người Dùng</th>
        <th scope="col">Email Người Dùng</th>
        <th scope="col">Quê Quán</th>

    </tr>
    </thead>
    <tbody>
    <c:forEach var="user" items="${userlist}">
    <tr>
        <td scope="row">${user.getIdUser()}</td>
        <td>${user.getNameUser()}</td>
        <td>${user.getEmailUser()}</td>
        <td>${user.getCountryUser()}</td>
    </tr>
    </c:forEach>

</body>
</html>
