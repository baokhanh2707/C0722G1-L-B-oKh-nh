<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 22/11/2022
  Time: 13:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Settings</h1>

<form:form action="save" method="post" modelAttribute="settings">
    <form:label path="language">Languages</form:label>
    <form:select path="language" items="${languages}"></form:select>
    <br>
    <form:label path="pageSize">Page Size</form:label>
    <form:select path="pageSize" items="${pageSizes}"></form:select>
    <br>
    <span>Span filter:</span><form:checkbox path="spamsFilter" value="Enable spams filter"/>
    <span>Enable spams filter</span>
    <br>
    <form:label path="signature">signature</form:label><form:textarea path="signature"/>
    <br>
    <input type="submit" value="Update">
    <input type="reset" value="Cancel">
</form:form>
</body>
</html>
