<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 21/11/2022
  Time: 11:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Sandwich Condiments</h1>
<p>nhập lựa chọn của bạn vào đây</p>
<form action="sandwich" method="post">
    <input type="checkbox" name="condiment" value="Lettuce"><label>Lettuce</label>
    <input type="checkbox" name="condiment" value="Tomato"><label>Tomato</label>
    <input type="checkbox" name="condiment" value="Mustard"><label>Mustard</label>
    <input type="checkbox" name="condiment" value="Sprouts"><label>Sprouts</label>
    <button type="submit">Save</button>

</form>
<p>kết quả :</p>
<c:if test="${condiment!=null}">
    <c:forEach var="list" items="${condiment}">
        <p>${list}</p>
    </c:forEach>
</c:if>
</body>
</html>
