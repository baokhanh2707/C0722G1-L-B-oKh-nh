<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 09/11/2022
  Time: 20:26
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
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div>
            <img src="https://www.furama.com/images/LOGOFurama_4C_Normal.png" height="100" width="800"/>
        </div>
        </ul>
        <form class="d-flex">
            <button class="btn btn-outline-warning" type="submit">Login <img src="customer/jquery/baseline_login_black_24dp.png"
                                                                             height="24" width="24"></button>
        </form>
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
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
<div class="row" style="height: 100%">
    <div class=" col-lg-3">
        <ul class="list-group vh-100" style="border: 2px solid #FFD700">
            <li class="list-group-item" aria-current="true">An active item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
        </ul>
    </div>
    <div class="col-lg-9 " style="height: 90%">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner" style="height: 470px">
                        <div class="carousel-item active">
                            <img src="Furama-????-N???ng-Resort.jpg" class="d-block w-100 " alt="...">

                        </div>
                        <div class="carousel-item">
                            <img src="Furama-????-N???ng-Resort.jpg" class="d-block w-100"
                                 alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="Furama-????-N???ng-Resort.jpg" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                            data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <p>Furama ???? N???ng n???m ngay trung t??m th??nh ph??? ???? N???ng t???o n??n m???t ??i???m n???i b???t, d???u ???n cho th??nh ph???
                    tr??? n??n n???i ti???ng h??n khi ???????c r???t nhi???u du kh??ch trong v?? ngo??i n?????c bi???t ?????n. Kh??ng nh???ng th???,
                    Furama ???? N???ng c??n l?? m???t ?????a ??i???m ???v??ng??? khi n???m g???n ngay b??i bi???n xinh ?????p M??? Kh??.

                    T??? b???t k??? c??n ph??ng n??o trong khu ngh??? d?????ng, b???n ch??? c???n kh??? m??? c??nh c???a s??? l?? ???? nh??n th???y bi???n
                    xanh, hay ch??? c???n m???y b?????c ch??n th??i, b???n ???? ???????c ng???m bi???n tr???i ?????i d????ng bao la, c???m nh???n s??? n??ng
                    b???ng c???a b??i c??t tr???ng r???i ?????m m??nh xu???ng l??n n?????c m??t l???nh.</p>
            </div>
            <div class="col-lg-1"></div>
        </div>
    </div>

</div>
<div>
    <footer class="bg-warning text-center text-lg-start" >
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            ?? 2022 ???? N???ng:
            <a class="text-dark"
               href="https://ticotravel.com.vn/resort/furama-resort-da-nang/?gclid=CjwKCAjw5P2aBhAlEiwAAdY7dB9I33tRqQG
               gAIuh-DPHuwlylS_eB95UGd_YOPGXwax7kdVPKlWRmRoC1nEQAvD_BwE">Furama
            </a>
        </div>
    </footer>
</div>
</body>
</html>
