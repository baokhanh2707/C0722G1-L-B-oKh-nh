package controller;

import model.User;
import service.IUserService;
import service.impl.UserService;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "UserServlet", value = "/user")
public class UserServlet extends HttpServlet {
    private IUserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "add":
                save(request, response);
                break;
            case "addCall":
                saveCall(request, response);
                break;
            case "edit":
                update(request, response);
                break;
            case "remove":
                remove(request, response);
                break;
            case "findByCountry":
                findByCountry(request, response);
                break;
            case "findById":
                findById(request, response);
                break;
            default:
        }
    }

    private void saveCall(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String country = request.getParameter("country");
        User user = new User(id, name, email, country);
        boolean check = userService.add(user);
        String mess = "Error create";
        if (check) {
            mess = "Added";
        }

        request.setAttribute("mess", "Added");
        try {
            request.getRequestDispatcher("view/user/create-call.jsp").forward(request, response);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }

    private void findById(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        List<User> userList= userService.getUserById(id);
        request.setAttribute("userList",userList);
        try {
            request.getRequestDispatcher("view/user/search.jsp").forward(request,response);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }


    private void findByCountry(HttpServletRequest request, HttpServletResponse response) {
        String country = request.getParameter("country");
        List<User> userList = userService.findByCountry(country);
        request.setAttribute("userList", userList);
        try {
            request.getRequestDispatcher("view/user/search.jsp").forward(request, response);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }

    private void remove(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        boolean check = userService.remove(id);
        String mess = "Delete Error";
        if (check) {
            mess = "DELETE WELL DONE";
        }
        request.setAttribute("mess", "DELETE WELL DONE");
        try {
            response.sendRedirect("/user");
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    private void update(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String country = request.getParameter("country");

        User user = new User(id, name, email, country);

        userService.update(id, user);

        boolean check = userService.update(id, user);

        String mess = "Error Edit";
        if (check) {
            mess = "Edit well done";
        }
        request.setAttribute("mess", "Edit well done");
        try {
            request.getRequestDispatcher("view/user/edit.jsp").forward(request, response);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }

    private void save(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String country = request.getParameter("country");
        User user = new User(id, name, email, country);
        boolean check = userService.add(user);
        String mess = "Error create";
        if (check) {
            mess = "Added";
        }

        request.setAttribute("mess", "Added");
        try {
            request.getRequestDispatcher("view/user/create.jsp").forward(request, response);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "add":
                showInputForm(request, response);
                break;
            case "edit":
                showEditForm(request, response);
                break;
            case "addCall":
                showInputFormCall(request, response);
                break;
            case "test-use-tran":
                testUseTran(request, response);
                break;
            default:
                showList(request, response);
        }
    }

    private void testUseTran(HttpServletRequest request, HttpServletResponse response) {
        userService.addUserTransaction();
    }

    private void showInputFormCall(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/user/create-call.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        List<User> userList = userService.findAll();
        User user = null;
        String str = "";
        for (User value : userList) {
            if (value.getIdUser() == id) {
                user = value;
                break;
            }
        }
        request.setAttribute("id", user.getIdUser());
        request.setAttribute("name", user.getNameUser());
        request.setAttribute("email", user.getEmailUser());
        request.setAttribute("country", user.getCountryUser());

        try {
            request.getRequestDispatcher("view/user/edit.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/user/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showList(HttpServletRequest request, HttpServletResponse response) {
        List<User> userList = userService.findAll();

        request.setAttribute("userList", userList);
        try {
            request.getRequestDispatcher("view/user/list.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}