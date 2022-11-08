<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 07/11/2022
  Time: 21:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Product Edit</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>
<h1 style="text-align: center">Edit Info</h1>
<div class="row">
    <div class="col-md-2">
        <a href="/user">
            <button class="btn btn-success">Back to List</button>
        </a>
    </div>
    <div class="col-md-8"></div>
    <div class="col-md-2">
        <c:if test="${mess!=null}">
            <h4 style="color: blue">${mess}</h4>
        </c:if>
    </div>

</div>

<div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
        <form action="/user?action=edit" method="post">
            <div class="form-content ">

                <div class="col-md-12">
                    <div class="form-group">
                        <input type="text" class="form-control" name="id" value="${id}" placeholder="ID *"
                        >
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" class="form-control" name="name" value="${name}"
                               placeholder="NAME *" />
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" class="form-control" name="email" value="${email}"
                               placeholder="EMAIL *"/>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" class="form-control" name="country"
                               value="${country}" placeholder="COUNTRY *"
                        />
                    </div>
                </div>
                <br>
                <button type="submit" class="btn btn-outline-success">Submit</button>
            </div>
        </form>
    </div>
    <div class="col-md-4"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>
</body>
</html>