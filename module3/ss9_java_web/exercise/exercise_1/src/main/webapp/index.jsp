<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 02/11/2022
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Product Discount Calculator</title>
  </head>
  <body>
  <h2>Currency Converter</h2>
  <form action="/discount" method="post">
    <label>Product Description : </label><br/>
    <input type="text" name="product"/><br/>
    <label>List Price: </label><br/>
    <input type="text" name="price"/><br/>
    <label>Discount Percent: </label><br/>
    <input type="text" name="percent"/><br/>
    <input type = "submit" id = "submit" value = "Calculate Discount"/>
  </form>
  </body>
</html>
