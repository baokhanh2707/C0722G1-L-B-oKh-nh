<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 05/11/2022
  Time: 19:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Product Remove</title>

</head>
<body>
<h1>Delete Product</h1>
<c:if test="${mess!=null}">
    <span style="color: red" >${mess}</span>
</c:if>
<a href="/product">Quay lại list</a>
<form action="/product?action=delete" method="post">
    <pre>id Product  <input type="text" name="idProduct"> </pre>
    <pre><button>delete</button></pre>
</form>
</body>
</html>
