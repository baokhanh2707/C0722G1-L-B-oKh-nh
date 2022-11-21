<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 21/11/2022
  Time: 14:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Calculator</h1>
<form action="calculator" method="post">
    <input type="text" name="number1">
    <input type="text" name="number2">
    <select name="sign">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <button type="submit">=</button>
</form>
<p>Đây là kết quả :</p>
${result}
</body>
</html>
