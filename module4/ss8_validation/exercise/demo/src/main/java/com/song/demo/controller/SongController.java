package com.song.demo.controller;

import com.song.demo.dto.SongDto;
import com.song.demo.model.Song;
import com.song.demo.service.ISongService;
import org.springframework.beans.BeanUtils;
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
    public String showList(Model model) {
        List<Song> songList = iSongService.findAll();
        model.addAttribute("songList", songList);
        return "/list";
    }
    @PostMapping("/save")
    public String checkValidate(@Validated @ModelAttribute("songDto") SongDto songDto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        new SongDto().validate(songDto,bindingResult);
        if (bindingResult.hasErrors()) {
            return "/create";
        }
        Song song = new Song();
        BeanUtils.copyProperties(songDto, song);
        iSongService.save(song);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("songDto", new SongDto());
        return "/create";
    }

    @GetMapping("/edit")
    public String update(@RequestParam(required = false) Integer id, Model model) {
        Song song  = iSongService.findById(id).get();
        SongDto songDto = new SongDto();
        BeanUtils.copyProperties(song, songDto);
        model.addAttribute("songDto", songDto);
        return "/edit";
    }

    @PostMapping("/update")
    public String edit(@Validated @ModelAttribute("songDto") SongDto songDto, BindingResult bindingResult, RedirectAttributes redirect) {
        new SongDto().validate(songDto,bindingResult);
        if (bindingResult.hasErrors()) {
            return "/edit";
        }
        Song song = new Song();
        BeanUtils.copyProperties(songDto, song);
        iSongService.save(song);
        redirect.addFlashAttribute("message", "Sửa thành công");
//        redirect.addFlashAttribute("song", song);
        return "redirect:/";
    }
}
