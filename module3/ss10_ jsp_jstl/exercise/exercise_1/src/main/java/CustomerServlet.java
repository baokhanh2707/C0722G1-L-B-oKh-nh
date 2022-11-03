import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "CustomerServlet",urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {
    private static List<customer>customerList=new ArrayList<>();
    static {
        customerList.add(new customer("Mai Văn Hoàn","1983-08-20","Hà Nội","https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-16.jpg"));
        customerList.add(new customer("Nguyễn Văn Nam","1983-08-21","Bắc Giang","https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"));
        customerList.add(new customer("Nguyễn Thái Hòa","1983-08-22","Nam Định","https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"));
        customerList.add(new customer("Trần Đăng Khoa","1983-08-17","Hà Tây","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUAZgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIEBQcDAQj/xAA7EAACAQMDAgQBCgQFBQAAAAABAgMABBEFEiExQQYiUWETBxQjMnGBkaHB8EKx4fEVJVJy0RY0Q4KS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAHBEBAQEBAAMBAQAAAAAAAAAAAAERAgMhMSIS/9oADAMBAAIRAxEAPwDWoJ45wTE6uvqpyK7UCQtG1yTC+wkcNE+05z7VcWGozQSE3EzzoRtG7GR7+9CrwIu9R7+/tdOtnuL2dIYl6sxqLd6zaWljJeTSgRxjJHf2rE/FXiS61y7aaeQrAp+jjHRR/wA+9CRvqnyp2sUhTT7b4gB4eUkZ+4VBtflH1Jy0ssMXwifKMY/A0AWscMY+cTJvcn+LnFOnuC8hBPm9R0NBaPj8peofF/7W32ntk0RaP8oem3hEd8rWsndvrJ+PUVjKy44Y05Z9pxnp0NMpX0pFIk0ayROrowyrKcgj2NPPSsP8I+MLrQrgJJulsmP0kO7p7rngH8j+dbVZ3UN7axXNs4khlUMrDuKSgUbqNdVshn6rFcenmNHY6VmNy3w9XfJ5S4IH/wBVpckscfMjqn+5gKUBxpVCu72EKPhXNqHz/wCSQYx91e0yZ8jI2oyymHMcgGFP2Y/nUy2jk3OolYbTwuc4qG11G30kMitjny1F1vWZrPT7iRRtIUqWyM59xjNQv4ofFOszX8gtC42RHkKOrf0qottJlvV77c1Fsphc3UUZ5Ltk0deHI0azXAAYEg/jS6uL45/q+wlqGnS26nrtPQehFVhJx7jke1aPrNkssbIRw44+2s5uz8GSSN+JInwwx696fPSe+M+I8jZGa4GbseMd/ek8ykEHg9D7elRJXzwavWWLSC4Drg8MK0j5J/Ehiu20W6k+jmy0GT9V/T7/ANPeseWZo33A1Z2eoSQXEN1A22WFw6n3BzS02qatF/nd2RklbhiMf7qJfFdqt/OjTt8MWzb8xdXUc7TntVRp3+cwSanEpzdAtgD6pPUZq7vo769JZLeLY6AYeVlPTHPlpGF9Rls7p45GSVdqlVEc+xSPsB60qtf+n7sqAsWnoB/qVn/4r2mWPbDw9qMKt8T5ouW4VWbGPwNBPyoxtp6wW7SIXmG5wmew/vWjvr8gGRboP/fOPyrGflD1g6vrssxACxIEAHT3qVKvw5LGmpQSzMFRXAyTWg6Zcx2epMoYG2uPPG2eN3cfr+NAvgsR3NzNavaRzNu3K0hwF46flR34da01JGjt48CNsFCuNre1R028fxeXVzZNEUmmVM9OaBPFFpDNKt3byBmxskwOGH9KK7+3htVLzQhscAY654FU11qNvb37afLp8YlUciMZxxn09PTNKNOud9M+vomTzY5+q2PUVD3+taRqWiw31u0sMSqSDzjHas7vbd7WZkcdDjmrnWsPJ47y4N1wa9hkKNXMnHB5H8qXcYqmTZPki1hDZXOnTvgxnfEMfwnsPz/GtAn1C3t4TLJvKDGSENYR4D1T/Ctctp3OInOyTPTB/rW66hGJdPOOjEEfZmkaDJ4mtlOI7W4ceoCj9aVc47JSvQfhXlACU+plLSWWSVd652oOfszWcPZXepSTyQoZFV8ynPIGetbf4ysYRpJjgt41LEklEGeBWf8AhqzaHUNRQOnwtibotuWII8rA+3IpX008cnXWVw8AaO0OrXgkAMbwIyNj3NaXptnHA5IGT1JND3h2JbbUXiByrIShx79KILu5ktIXdU3A9T6VnbrqnMkyHTxRzblYA5qH/g0bNudu2OAOR9tNtLn5xJGY0cZPmDCrZj5alUyKu9gjS3KKvAFCEnhWx1O6lur8uLZcgLGdpdu/Pp++1Gcn08xiHYZY+gqrvpviL8CFdiIeBTlOzmz2x3W9MOn3Eq7XVBKVRX5O3tz34xVfCu9ttWev3bXmrXTs7YErBVJ4GOP0qLAgD5HpW0ef1m+kyMbEXBwS/B9623wVrC6t4aSJ2zPbkI4Pp2rEicoF79R9oop8BawbHU4tzERTERyj37GmX1s0UXlr2u0IBQEGlQR15ax3UJjkGQfyoIuvC1xbasJbedY0C+V9uSQTyp9exrQMVC1Bfo1J6A4pX4fNsoOi0x7WUTfGzIMNgRgDPfvXl9qF81pNNbLFshxvVgS3Jx0++r+6TykVSMDbTtIM/DfyyLj6w7VlY6PH5LOtvtW6Zr14zhDYIx/1I20fmKM7ZfhxCa6XDEZ2HnFRdNtbUxrdiNNrcocdfemaldMTlSf3+x+FEivN5Z1fzMK4yqyCOctvY+ZyMKPTHtVNcHT7TcwZ7ifpuY4X7gP1zSdZJSdmTTV0tn5YGnkZ3u1nHj0xS39s8UEcbFWDFFA3AY6/nQ9GOg7mi7x/YfN5raT/AHA/v7qGbO2eaQKoJOD26VrrGz2udJ0Zb+Ayu3PZQR+NSJdEmsnkkgJZY8FmHVc9D+Ioh0q0MWlxnZz5duOhyR61LMEqXciKcqUJcH+IDGf50tVgz8F6quraNExOJoxskHoRSoBttQuPDt29xZJm3ul+oT0YY/f30qZY2CuF3F8aMx5xu70y2vFubOK4RJI1lQOFkGGAPqK5ySkLktk9hU3opEO8Uo5Vcke1QUtBcTJGw8pPmHt3/l+dSri4+kKBgzetO0tmeaRmOQuR+f8AeoUkXaqybBhdvAHpVS1nLK3GCD+/1qyu2LHbzjPJp9nATyMqDQEa204LztGalvZokZJqfHGFrndkfAbigMj+U0IZLYA4YMcr2NVfhe0RbaS4kGC3C570vHF6bzxIbOM7lhXnHqT/AEqz0aD5y6QRn6BRhiOMgdasQR2MCfNIISCQQuM+39sVJazHxrcr1ZGX8s/pT7YF5mkjXbGq7Vx3H7H8qn3UTI0BAxtJ6eu01JgnXLZRCI3ysYl6ehxSrv4sSSKReSMt6daVUWj24udrHtjioM92XHB7Uy6fDHIpkeH2jvUg+2jLOzvVhpYxC5xjJ/rXIqI7c46mu1jn5u3HVuBSBzDL89CcVOj4GajxKd4GOByfc1MWMYoBytVRrl38C1kk4AQEkn2qxuXEcZwcEVm3yna5800j5rE2JrnyDHUDuaJ9FAVnK2o6xc3TEBpZCw9h/YUf6VbRpAEjzljtAoE8L2c0kiC1Tez8Y6Aff2rXNB0c2ip852tKAO3APt+NV0In6fZBQpYHHUj7K9vWVZIs8ZbjP2EVPlBHKgDNV9wnxpMKMgHIJqTD3ii3FwsTADO79K9q01CLyL8TscZxSqtJGWY3MSyZG7GGHvXa2JBA96orSSW3mDbiw6Fc8EUS24SRFlj+qwzQEi7O23GO5rpp7Ztl5/iPNR9Sfaqge5xXTRm3WXr5z+/zpBZRJzkfdUpm2rmuMOCM1H1S6+DCecCgKvXNSWCNyXwoGSawPxHqFzq+tyzz7gn1Yk3cKnb+tanfTG+uQATsB5HrVLquh/OpPhQIqFjln29D1olFib4CVILVGZNrEAY6UewyGTHnAOeuOM0A6A0+6W3lj2NC20kdG96OtMtlKh+c+g4ooSizFvI+7j6o4p6BdowOlcX8shx5R2Fe7gvPc/maQNuo1fAbtXtMkkyfNzXlAChHm6miHQl3WUjk9JMAfcKVKroeaufOPZa6+HmJjlU9nz+/wpUqkL2IfR/dQrrs7u2zOATXtKihTaVGro0zckHAFE/+HxC3Cj6w827HWvaVKAPWkKRX0oAyS3WizTl2xgg9BmvKVAOlTc3XHOa4F8w8jgnGM0qVARs5Az1HFKlSph//2Q=="));
        customerList.add(new customer("Nguyễn Đình Thi","1983-08-19","Hà Nội","data:image/jpeg;base64,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"));

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("customerList",customerList);
request .getRequestDispatcher("customer.jsp").forward(request,response);
    }
}
