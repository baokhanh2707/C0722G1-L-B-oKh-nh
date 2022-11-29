package com.song.service;

import com.song.model.Song;

import java.util.List;

public interface ISongService {
    List<Song> findAll(Song song);

    Song save(Song song);

}
