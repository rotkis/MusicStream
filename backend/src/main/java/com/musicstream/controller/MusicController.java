package com.musicstream.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.musicstream.dto.MusicDTO;
import com.musicstream.model.postgres.Music;

import com.musicstream.service.MusicPlayService;
import com.musicstream.service.MusicService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/musicas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MusicController {

    private final MusicService musicService;
    private final MusicPlayService playService;

    @GetMapping
    public ResponseEntity<List<Music>> getAll() {
        return ResponseEntity.ok(musicService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Music> getById(@PathVariable String id) {
        return musicService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Music> create(@Valid @RequestBody MusicDTO dto) {
        Music saved = musicService.save(dto);
        URI location = URI.create("/api/musicas/" + saved.getId());
        return ResponseEntity.created(location).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        musicService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/play")
    public ResponseEntity<Void> registerPlay(
            @PathVariable String id,
            @RequestParam String userId) {
        playService.registerPlay(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/top")
    public ResponseEntity<List<Music>> getTop(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(playService.getTopMusics(limit));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Music>> getByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(musicService.findByGenre(genre));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Music>> searchByArtist(@RequestParam String artist) {
        return ResponseEntity.ok(musicService.searchByArtist(artist));
    }
}