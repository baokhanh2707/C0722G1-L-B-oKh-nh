<%--
  Created by IntelliJ IDEA.
  User: win
  Date: 18/11/2022
  Time: 15:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="dictionary" method="post">
<p>nhập chữ tiếng anh cần chuyển đổi sang tiếng việt</p>
<input type="text" name="tiengAnh">
<button type="submit">translate</button>
</form>
<p>
    kết quả :${translate}
</p>
</body>
</html>
