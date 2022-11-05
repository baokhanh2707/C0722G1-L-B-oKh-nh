<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 05/11/2022
  Time: 12:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Edit Product</h1>
<c:if test="${mess!=null}">
    <span style="color: red" >${mess}</span>
</c:if>
<a href="/product">Quay lại list</a>
<form action="/product?action=edit" method="post">
    <pre>number Id <input type="text" name="numberId"> </pre>
    <pre>id Product  <input type="text" name="idProduct"> </pre>
    <pre>name Product <input type="text" name="nameProduct"> </pre>
    <pre>Cost <input type="text" name="cost"> </pre>
    <pre><button>Edit</button></pre>
</form>
</body>
</html>
