package com.song.demo.service;


import com.song.demo.model.Song;

import java.util.List;
import java.util.Optional;

public interface ISongService {
    List<Song> findAll();

    Song save(Song song);

    Optional<Song> findById(Integer id);

}
