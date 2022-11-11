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
    <title>Create Customer</title>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div>
            <img src="https://www.furama.com/images/LOGOFurama_4C_Normal.png" height="100" width="800"/>
        </div>
    </div>
</nav>
<nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a style="color: white;" class="nav-link" aria-current="page"
                       href="furama_resort.html">Home</a>
                </li>
                <li class="nav-item">
                    <a style="color: white;" class="nav-link"
                       href="">Employee</a>
                </li>
                <li class="nav-item">
                    <a style="color: white;" class="nav-link"
                       href="/customer">Customer</a>
                </li>
                <li class="nav-item">
                    <a style="color: white;" class="nav-link"
                       href="/facility">Facility</a>
                </li>
                <li class="nav-item">
                    <a style="color: white;" class="nav-link"
                       href="/Layout/Contract/contract_list.html">Contract</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<h1 class="align-bottom text-center">Thêm Mới Khách Hàng</h1>

</div>
<c:if test="${mess!=null}">
    <h4 style="color: blue">${mess}</h4>
</c:if>
<a class="btn btn-outline-warning" href="/customer">Quay lại list</a>
<form action="/customer?action=add" method="post">
    <div class="form-content">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group" >
                    <label>Id</label>
                    <input type="text" style="border-radius: 30px" class="form-control" name="id" placeholder="ID *"/>
                </div>
                <br>
                <div class="form-group">
                    <label>Select Customer Type</label>
                    <select name="idType" class="form-select" aria-label="Default select example"
                            style="border-radius: 30px">
                        <option selected>SELECT CUSTOMER TYPE *</option>
                        <option value="1">Diamond</option>
                        <option value="2">Platinum</option>
                        <option value="3">Gold</option>
                        <option value="4">Silver</option>
                        <option value="5">Member</option>
                    </select>
                </div>
                <br>
                <div class="form-group" >
                    <label>Name</label>
                    <input style="border-radius: 30px" type="text" class="form-control" name="name"
                           placeholder="NAME *"/>
                </div>
                <br>
                <div class="form-group" >
                    <label for="birtdDateAdd">Birth Day</label>
                    <input style="border-radius: 30px" name="dayOfBirth" id="birtdDateAdd" class="form-control" type="date"/>
                </div>
                <div class="form-group">
                    <br>
                    <label>Gender</label>
                    <select style="border-radius: 30px" name="gender" class="form-select" aria-label="Default select example"
                            style="border-radius: 30px">
                        <option selected>SELECT GENDER *</option>
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                </div>
                <br>
            </div>
            <div class="col-md-6">

                <div class="form-group" >
                    <label>Id Card</label>
                    <input type="text" style="border-radius: 30px" class="form-control" name="idCard"
                           placeholder="ID CARD *"/>
                </div>
                <br>
                <div class="form-group" >
                    <label >Phone Number</label>
                    <input type="text" style="border-radius: 30px" class="form-control" name="phoneNumber"
                           placeholder="PHONE NUMBER *"/>
                </div>
                <br>
                <div class="form-group">
                    <label for="birtdDateAdd">E-mail</label>
                    <input type="text"  style="border-radius: 30px" class="form-control" name="email"
                           placeholder="EMAIL *"/>
                </div>
                <br>
                <div class="form-group">
                    <label for="birtdDateAdd">Address</label>
                    <input  style="border-radius: 30px" type="text" class="form-control" name="address"
                            placeholder="ADDRESS *"/>
                </div>
            </div>
        </div>
        <br>
        <button type="submit" class="btn btn-outline-warning">Submit</button>
    </div>
</form>
</body>


