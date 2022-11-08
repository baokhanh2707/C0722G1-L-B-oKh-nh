<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 07/11/2022
  Time: 13:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>
<h1 style="text-align: center">Product List</h1>
<h4>add </h4>
<button  onclick="location.href='/user?action=add'">Add</button>
<h6>add all</h6>
<button  onclick="location.href='/user?action=addCall'">Add</button>
<form action="/user?action=findByCountry" method="post">
    <label>
        <input type="text" placeholder="Search by country" name="country">
    </label>
    <button class="btn btn-primary">
        Search
    </button>
</form>
<form action="/user?action=findById" method="post">
    <input type="text" placeholder="Search by id" name="id">
    <button class="btn btn-primary">
        Search
    </button>
</form>

<table class="table table-primary text-center ">
    <tr>
        <th hidden>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Country</th>
        <th colspan="3">CRUD</th>
    </tr>
    <c:forEach var="user" items="${userList}">
        <tr>
            <td hidden><p name="id">${user.getId()}</p></td>
            <td>${user.getName()}</td>
            <td>${user.getEmail()}</td>
            <td>${user.getCountry()}</td>
            <td>
                <button class="btn btn-warning" onclick="location.href='user?action=edit&id=${user.getId()}'">
                    Edit
                </button>
            </td>
            <td>
                <button type="button" onclick="idRemove('${user.getId()}')" class="btn btn-danger" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                    Delete
                </button>
            </td>
            <td>
                <button class="btn btn-info" onclick="location.href='product?action=view&id=${user.getId()}'">View
                </button>
            </td>
        </tr>

    </c:forEach>

</table>
<%-- REMOVE--%>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">DELETE</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            <div class="modal-body">

                Are you sure to delete???
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel
                </button>
                <form action="/user?action=remove" method="post">
                    <input type="hidden" name="id" id="idInput">
                    <button class="btn btn-primary">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous">
</script>

<script>
    function idRemove(id) {
        document.getElementById("idInput").value=id;
    }
</script>
</body>
</html>