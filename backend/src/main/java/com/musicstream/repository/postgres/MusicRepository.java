package com.musicstream.repository.postgres;
import com.musicstream.model.postgres.Music;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, String> {
    List<Music> findByGenre(String genre);
    List<Music> findByArtistContainingIgnoreCase(String artist);
}
