package com.book.controller;

import com.book.model.Book;
import com.book.model.OderBook;
import com.book.service.IBookService;
import com.book.service.IOderBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
@Controller
@RequestMapping("")
public class BookController {
    @Autowired
    private IBookService iBookService;
    @Autowired
    private IOderBookService iOderBookService;
    @GetMapping("")
    public String listBook(Model model){
        model.addAttribute("bookList", iBookService.findAll());
        return "/list";
    }
    @GetMapping("/{id}/oder")
    public String showFormOder(@PathVariable(value = "id") int id, Model model) {
        model.addAttribute("book", iBookService.findById(id));
        return "/formOder";
    }
    @PostMapping("/saveOder")
    public String saveOder(@ModelAttribute(value = "book") Book book, RedirectAttributes redirectAttributes) {
        if (book.getQuantity() > 0) {
            OderBook oderBook = new OderBook();
            Long bookRentalCode = (long) (Math.random() * (99999 - 10000) + 10000);
            oderBook.setBookRentalCode(bookRentalCode);
            oderBook.setBook(book);
            iOderBookService.saveOder(oderBook);
            int quantity = book.getQuantity() - 1;
            book.setQuantity(quantity);
            iBookService.saveBook(book);
            redirectAttributes.addFlashAttribute("mess", "Oder Success!!! Book rental code is: " + bookRentalCode);
            return "redirect:/";
        }
        return "/error";
    }
    @GetMapping("/pay")
    public String showFormReturnBook(Model model) {
        model.addAttribute("oderBook", new OderBook());
        return "/formPay";
    }

    @PostMapping("/savePay")
    public String saveReturn(@ModelAttribute(value = "oderBook") OderBook oderBook, RedirectAttributes redirectAttributes) {
        OderBook oderBookReturn = iOderBookService.findByBookRentalCode(oderBook.getBookRentalCode());
        if (oderBookReturn != null) {
            Book book = iBookService.findById(oderBookReturn.getBook().getId());
            book.setQuantity(book.getQuantity() + 1);
            iBookService.saveBook(book);
            oderBookReturn.setBookRentalCode((long) 0);
            iOderBookService.saveOder(oderBookReturn);
            redirectAttributes.addFlashAttribute("mess", "Pay Success!");
            return "redirect:/";
        }
        return "/error";
    }

}
