package com.musicstream.model.mongodb;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "playlists")
@Data
@NoArgsConstructor
public class Playlist {

    @Id
    private String id;

    private String name;
    private String userId;
    private List<String> musicIds;

    // @CreatedDate só funciona com @EnableMongoAuditing ativo.
    // Isso está configurado em MongoConfig.java (arquivo criado junto).
    @CreatedDate
    private LocalDateTime createdAt;
}