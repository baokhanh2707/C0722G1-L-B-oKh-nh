package controller;

import model.Product;
import service.IProductService;
import service.impl.ProductService;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ProductServlet", urlPatterns = {"/product"})
public class ProductServlet extends HttpServlet {
    private IProductService productService = new ProductService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "add":
                save(request, response);
                break;
            case "edit":
                update(request, response);
                break;
            case "delete":
                delete(request,response);
                break;
            default:
                showListProduct(request, response);
        }
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        Product product = productService.findById(idProduct);
        productService.delete(idProduct);
        request.setAttribute("product", product);
        request.setAttribute("mess", "xóa thành công ");
        try {
            request.getRequestDispatcher("view/product/delete.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void update(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int numberId = Integer.parseInt(request.getParameter("numberId"));
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        String nameProduct = request.getParameter("nameProduct");
        int cost = Integer.parseInt(request.getParameter("cost"));
        Product product = productService.findById(idProduct);
        product.setNumberID(numberId);
        product.setNameProduct(nameProduct);
        product.setCost(cost);
        productService.edit(idProduct,product);
        request.setAttribute("product", product);
        request.setAttribute("mess", "xóa thành công ");
        request.getRequestDispatcher("view/product/edit.jsp").forward(request, response);
    }


    private void save(HttpServletRequest request, HttpServletResponse response) {
        int numberId = Integer.parseInt(request.getParameter("numberId"));
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        String nameProduct = request.getParameter("nameProduct");
        int cost = Integer.parseInt(request.getParameter("cost"));
        Product product = new Product(numberId, idProduct, nameProduct, cost);
        productService.add(product);
        request.setAttribute("mess", "Thêm mới thành công");
        try {
            request.getRequestDispatcher("view/product/edit.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showListProduct(HttpServletRequest request, HttpServletResponse response) {
        List<Product> productList = productService.finAll();
        request.setAttribute("productList", productList);
        try {
            request.getRequestDispatcher("view/product/list.jsp").forward(request, response);
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
            case "add":
                showFormCreate(request, response);
                break;
            case "edit":
                showEditForm(request, response);
                break;
            case "delete":
                showDeleteForm(request,response);
                break;
            case "view":
                showDetail(request, response);
            default:
                showListProduct(request, response);
        }
    }

    private void showDetail(HttpServletRequest request, HttpServletResponse response) {
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        Product product = productService.findById(idProduct);
        request.setAttribute("product", product);
        try {
            request.getRequestDispatcher("/view/product/view.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showDeleteForm(HttpServletRequest request, HttpServletResponse response) {
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        Product product = productService.findById(idProduct);
        request.setAttribute("product", product);
        try {
            request.getRequestDispatcher("/view/product/delete.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int idProduct = Integer.parseInt(request.getParameter("idProduct"));
        Product product = productService.findById(idProduct); /** **/
        if (product == null) {
            request.getRequestDispatcher("view/product/error-404.jsp").forward(request, response);
        } else {
            request.setAttribute("product", product);
            request.getRequestDispatcher("view/product/edit.jsp").forward(request, response);
        }
    }


    private void showFormCreate(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/product/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

