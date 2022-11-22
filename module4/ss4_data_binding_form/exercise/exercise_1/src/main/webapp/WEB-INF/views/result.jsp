<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 22/11/2022
  Time: 14:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<table>
    <tr>
        <td>Languages:</td>
        <td>${settings.getLanguage()}</td>
    </tr>
    <tr>
        <td>Pages Size:</td>
        <td>${settings.getPageSize()}</td>
    </tr>
    <tr>
        <td>spam filters:</td>
        <td>${settings.getSpamsFilter()}</td>
    </tr>
    <tr>
        <td>Signature:</td>
        <td>${settings.getSignature()}</td>
    </tr>
</table>
</body>
</html>
