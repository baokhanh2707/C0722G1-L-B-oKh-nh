package controller;

import model.User;
import service.IUserService;
import service.impl.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "UserServlet",urlPatterns = "/user")
public class UserServlet extends HttpServlet {
    private IUserService userService=new UserService();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "search":
                search(request,response);
            case"sort":
                sort(request,response);
            default:
                showListUser(request, response);
        }
    }

    private void sort(HttpServletRequest request, HttpServletResponse response) {
        String nameUser=request.getParameter("nameUser");
        List<User>userList=userService.sort(nameUser);
        request .setAttribute("userList",userList);
        try {
            request.getRequestDispatcher("view/user/sort.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void search(HttpServletRequest request, HttpServletResponse response) {
        String countryUser=request.getParameter("countryUser");
        List<User>findUserList=userService.search(countryUser);
        request .setAttribute("findUserList",findUserList);
        try {
            request.getRequestDispatcher("view/user/search.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void showListUser(HttpServletRequest request, HttpServletResponse response) {
        List<User> productList = userService.finAll();
        request.setAttribute("userList", productList);
        try {
            request.getRequestDispatcher("view/user/list.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "search":
                showSearch(request,response);
            case"sort":
                showSort(request,response);
            default:
                showListUser(request, response);
        }
    }

    private void showSort(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.getRequestDispatcher("view/user/sort.jsp").forward(request,response);
    }

    private void showSearch(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/user/search.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
