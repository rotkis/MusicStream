package com.musicstream.repository.mongodb;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.musicstream.model.mongodb.Playlist;

public interface PlaylistRepository extends MongoRepository<Playlist, String> {
    List<Playlist> findByUserId(String userId);
}