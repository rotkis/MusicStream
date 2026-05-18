package com.musicstream.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musicstream.model.mongodb.Playlist;
import com.musicstream.repository.mongodb.PlaylistRepository;
import com.musicstream.service.MusicPlayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PlaylistController {

    private final PlaylistRepository playlistRepository;
    private final MusicPlayService musicPlayService;

    // GET /api/playlists/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<List<Playlist>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(playlistRepository.findByUserId(userId));
    }

    // POST /api/playlists
    // Body: { "userId": "uuid...", "name": "Favoritas" }
    @PostMapping
    public ResponseEntity<Playlist> criar(@RequestBody Playlist playlist) {
        Playlist salva = playlistRepository.save(playlist);
        return ResponseEntity.ok(salva);
    }

    // GET /api/playlists/{id}/shuffle
    @GetMapping("/{id}/shuffle")
    public ResponseEntity<?> shuffle(@PathVariable String id) {
        return playlistRepository.findById(id)
            .map(p -> {
                var shuffled = musicPlayService.getWeightedShuffle(p.getMusicIds());
                return ResponseEntity.ok(shuffled);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}