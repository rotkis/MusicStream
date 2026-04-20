package com.musicstream.repository.cassandra;

import java.util.List;
import org.springframework.data.cassandra.repository.CassandraRepository;
import com.musicstream.model.cassandra.MusicPlay;

public interface MusicPlayRepository extends CassandraRepository<MusicPlay, String> {

       List<MusicPlay> findByMusicId(String musicId);
}