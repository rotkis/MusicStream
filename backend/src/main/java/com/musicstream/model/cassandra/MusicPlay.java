package com.musicstream.model.cassandra;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
import java.time.LocalDateTime;

import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("music_plays")
@Data
@NoArgsConstructor
public class MusicPlay {

    // Chave de partição: agrupa todos os plays de uma música no mesmo nó
    @PrimaryKeyColumn(name = "music_id", type = PrimaryKeyType.PARTITIONED, ordinal = 0)
    private String musicId;

    // Chave de clusterização: identifica unicamente cada play dentro da partição
    // Usando UUID garante ordenação por tempo de inserção
    @PrimaryKeyColumn(name = "play_id", type = PrimaryKeyType.CLUSTERED, ordinal = 1)
    private UUID playId;

    @Column("user_id")
    private String userId;

    @Column("played_at")
    private LocalDateTime playedAt;

   
}