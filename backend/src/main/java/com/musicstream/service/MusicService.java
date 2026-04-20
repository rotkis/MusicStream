package com.musicstream.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.musicstream.dto.MusicDTO;
import com.musicstream.model.postgres.Music;
import com.musicstream.repository.postgres.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final MusicRepository musicRepository;

    public List<Music> findAll() {
        return musicRepository.findAll();
    }

    public Optional<Music> findById(String id) {
        return musicRepository.findById(id);
    }

    public Music save(MusicDTO dto) {
        Music music = new Music();
        music.setTitle(dto.getTitle());
        music.setArtist(dto.getArtist());
        music.setAlbum(dto.getAlbum());
        music.setGenre(dto.getGenre());
        music.setDurationSeconds(dto.getDurationSeconds());
        return musicRepository.save(music);
    }

    public void delete(String id) {
        musicRepository.deleteById(id);
    }

    public List<Music> findByGenre(String genre) {
        return musicRepository.findByGenre(genre);
    }

    public List<Music> searchByArtist(String artist) {
        return musicRepository.findByArtistContainingIgnoreCase(artist);
    }
}