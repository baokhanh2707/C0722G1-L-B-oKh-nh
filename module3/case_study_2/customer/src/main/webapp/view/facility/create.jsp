<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 10/11/2022
  Time: 10:19
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
<h1 class="align-bottom text-center">Thêm Mới Khách Hàng</h1>

<c:if test="${mess!=null}">
    <span style="color: red" >${mess}</span>
</c:if>
<a href="/facility">Quay lại list</a>
<form action="/facility?action=add" method="post">
    <pre>id <input type="text" name="id"> </pre>
    <pre> name<input type="text" name="name"> </pre>
    <pre> area<input type="text" name="area"> </pre>
    <pre> cost<input type="text" name="cost"> </pre>
    <pre> maxPeople<input type="text" name="maxPeople"> </pre>
    <pre> renTypeId<input type="text" name="renTypeId"> </pre>
    <pre> typeId<input type="text" name="typeId"> </pre>
    <pre> standardRoom<input type="text" name="standardRoom"> </pre>
    <pre> description<input type="text" name="description"> </pre>
    <pre> poolArea<input type="text" name="poolArea"> </pre>
    <pre> numberOfFloors<input type="text" name="numberOfFloors"> </pre>
    <pre> text<input type="text" name="text"> </pre>
    <pre><button>Save</button></pre>
</form>
</body>
</body>
</html>
