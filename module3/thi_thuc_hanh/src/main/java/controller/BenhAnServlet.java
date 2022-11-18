package controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "Servlet")
public class BenhAnServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
//            case "add":
//                save(request, response);
//                break;
//            case "delete":
//                delete(request, response);
//                break;
//            case "searchName":
//                searchName(request,response);
//                break;
//            case "searchId":
//                searchId(request,response);
//                break;
//            default:
//                showList(request, response);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
//            case "add":
//                showInputForm(request, response);
//                break;
//            default:
//                showList(request, response);
        }
    }

}
