package com.song.service.impl;

import com.song.model.Song;
import com.song.repository.ISongRepository;
import com.song.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SongService implements ISongService {
    @Autowired
    private ISongRepository iSongRepository;
    @Override
    public List<Song> findAll(Song song) {
        return iSongRepository.findAll();
    }

    @Override
    public Song save(Song song) {
        return iSongRepository.save(song);
    }
}
