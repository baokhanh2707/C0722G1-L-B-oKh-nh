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

<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>Edit Product</h1>

<c:if test="${mess!=null}">
    <span style="color: #ff0000" >${mess}</span>
</c:if>
<a href="/customer">Quay lại list</a>
<form action="/customer?action=edit" method="post">
    <pre > idCustomer <input type="text" hidden  name="id" value="${customer.getId()}"></pre>
    <pre>idType<input type="text" name="idType" value="${customer.getIdType()}"> </pre>
    <pre> name<input type="text" name="name" value="${customer.getName()}"> </pre>
    <pre> dayOfBirth<input type="date" name="dayOfBirth" value="${customer.getDayOfBirth()}" > </pre>
    <pre>
<input class="form-check-input" type="radio" value="false" name="gender"
       id="femaleGender"/> <label class="form-check-label" for="femaleGender">Nữ</label> </pre>
    <pre><input class="form-check-input" type="radio" value="true" name="gender"
                id="maleGender"/> <label class="form-check-label" for="maleGender">Nam</label></pre>
    <pre> idCard<input type="text" name="idCard" value=${customer.getIdCard()}""> </pre>
    <pre> phoneNumber<input type="text" name="phoneNumber" value="${customer.getPhoneNumber()}"> </pre>
    <pre> email<input type="text" name="email" value="${customer.getEmail()}"> </pre>
    <pre> address<input type="text" name="address" value="${customer.getAddress()}"> </pre>
    <pre><button type="submit">Edit</button></pre>
</form>

</body>
</html>
