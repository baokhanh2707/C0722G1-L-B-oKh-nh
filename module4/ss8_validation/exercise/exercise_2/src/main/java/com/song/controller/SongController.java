package com.song.controller;

import com.song.model.Song;
import com.song.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


@Controller
@RequestMapping("")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @GetMapping("")
    public String showList(@RequestParam("song") Song song , Model model) {
        List<Song> songList = iSongService.findAll(song);
        model.addAttribute("songList", songList);
        return "/list";
    }
    @PostMapping("/create")
    public String checkValidate(@Validated @ModelAttribute("song") Song song, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "/create";
        }
        iSongService.save(song);
        redirectAttributes.addAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }
}
