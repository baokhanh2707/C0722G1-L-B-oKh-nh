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
<h1 class="align-bottom text-center">Thêm Mới Villa</h1>
</div>
<c:if test="${mess!=null}">
    <h4 style="color: blue"> ${mess}</h4>
</c:if>
<form action="/facility?action=add" method="post">
    <div class="form-content">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Id</label>
                    <input style="border-radius: 30px" type="text" class="form-control" name="id" placeholder="id *"/>
                </div>
                <div class="form-group">
                    <label>Name</label>

                    <input style="border-radius: 30px" type="text" class="form-control" name="name"
                           placeholder="name *"/>
                </div>
                <br>
                <div class="form-group">
                    <label>Area</label>
                    <input style="border-radius: 30px" type="text" class="form-control" name="area"
                           placeholder="area *"/>
                </div>
                <br>
                <div class="form-group">
                    <label>Cost</label>

                    <input style="border-radius: 30px" type="text" class="form-control" name="cost"
                           placeholder="cost *"/>
                </div>
                <br>
                <div class="form-group">
                    <label>Select People Number</label>
                    <select name="maxPeople" class="form-select" aria-label="Default select example"
                            style="border-radius: 30px">
                        <option selected>SELECT People Number *</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label>Rent Type Id</label>
                    <select name="rentTypeId" class="form-select" aria-label="Default select example"
                            style="border-radius: 30px">
                        <option selected>SELECT RENTAL TYPE *</option>
                        <option value="1">Year</option>
                        <option value="2">Month</option>
                        <option value="3">Day</option>
                        <option value="4">House</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label>Facility Type Id</label>
                    <select name="typeId" class="form-select" aria-label="Default select example"
                            style="border-radius: 30px">
                        <option selected value="1">Villa</option>
                    </select>
                </div>
                <br>

            </div>
            <div class="col-md-6">

                <div class="form-group">
                    <label>Standard Room</label>
                    <select style="border-radius: 30px" class="form-select" aria-label="Default select example" name="standardRoom">
                        <option value="Standard Room *" selected>SELECT STANDARD ROOM</option>
                        <option value="Vip">Vip</option>
                        <option value="Normal">Normal</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label>Description Other Convenience</label>

                    <input style="border-radius: 30px" type="text" class="form-control"
                           name="description"
                           placeholder="descriptionOtherConvenience *"/>
                </div>
                <br>
                <div  class="form-group">
                    <label>Pool Area</label>

                    <input style="border-radius: 30px" type="text" class="form-control" name="poolArea"
                           placeholder="poolArea *"/>
                </div>
                <br>
                <div  class="form-group">
                    <label>Number Of Floors</label>

                    <input style="border-radius: 30px" type="text" class="form-control" name="numberOfFloors"
                           placeholder="numberOfFloors *"/>
                </div>
                <br>
                <div class="form-group">
                    <label>Facility Free</label>
                    <input style="border-radius: 30px" type="text" class="form-control" name="text"
                           placeholder="facilityFree *"/>
                </div>
            </div>
        </div>
        <br>
        <button type="submit" class="btn btn-outline-success">Submit</button>
    </div>
</form>

<div></div>
</body>
</html>
