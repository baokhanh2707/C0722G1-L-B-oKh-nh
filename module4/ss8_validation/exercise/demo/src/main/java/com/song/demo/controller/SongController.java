package com.song.demo.controller;

import com.song.demo.model.Song;
import com.song.demo.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @GetMapping("")
    public String showList(Model model) {
        List<Song> songList = iSongService.findAll();
        model.addAttribute("songList", songList);
        return "/list";
    }

    @PostMapping("/save")
    public String checkValidate(@Validated @ModelAttribute("song") Song song, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "/create";
        }
        iSongService.save(song);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("song", new Song());
        return "/create";
    }

    @GetMapping("/edit")
    public String update(@RequestParam(required = false) Integer id, Model model) {
        Optional<Song> song = iSongService.findById(id);
        model.addAttribute("song", song);
        return "/edit";
    }

    @PostMapping("/update")
    public String edit(@Validated @ModelAttribute("song") Song song, BindingResult bindingResult, RedirectAttributes redirect) {
        if (bindingResult.hasErrors()) {
            return "/edit";
        }
        iSongService.save(song);
        redirect.addFlashAttribute("message", "Sửa thành công");
        redirect.addFlashAttribute("song", song);
        return "redirect:/";
    }
}
