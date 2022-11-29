package com.song.demo.service.impl;

import com.song.demo.model.Song;
import com.song.demo.repository.ISongRepository;
import com.song.demo.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService implements ISongService {
    @Autowired
    private ISongRepository iSongRepository;

    @Override
    public List<Song> findAll() {
        return iSongRepository.findAll();
    }

    @Override
    public Song save(Song song) {
        return iSongRepository.save(song);
    }

    @Override
    public Optional<Song> findById(Integer id) {
        return iSongRepository.findById(id);
    }
}
