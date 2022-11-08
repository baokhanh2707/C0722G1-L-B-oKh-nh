<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 07/11/2022
  Time: 21:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<head>
    <title>Title</title>
</head>
<body>
<h1 class="align-bottom text-center">Thêm Mới Khách Hàng</h1>

<c:if test="${mess!=null}">
    <span style="color: red" >${mess}</span>
</c:if>
<a href="/customer">Quay lại list</a>
<form action="/customer?action=add" method="post">
    <pre>id <input type="text" name="id"> </pre>
    <pre>idType<input type="text" name="idType"> </pre>
    <pre> name<input type="text" name="name"> </pre>
    <pre> dayOfBirth<input type="date" name="dayOfBirth"> </pre>
    <pre> gender<input type="text" name="gender"> </pre>
    <pre> idCard<input type="text" name="idCard"> </pre>
    <pre> phoneNumber<input type="text" name="phoneNumber"> </pre>
    <pre> email<input type="text" name="email"> </pre>
    <pre> address<input type="text" name="address"> </pre>
    <pre><button>Save</button></pre>
</form>
</body>
</body>
</html>
