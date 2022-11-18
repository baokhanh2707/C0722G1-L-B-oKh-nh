<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 18/11/2022
  Time: 14:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="convert" method="post">
    <p>nhập số usd cần chuyển đổi</p>
    <input type="text" name="usd">
    <button type="submit">result</button>

</form>

<p>
    kết quả ${result}
</p>
</body>
</html>
