package com.musicstream.model.postgres;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "musics")
@Data
@NoArgsConstructor
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String artist;
    private String album;

    private String genre;
    private Integer durationSeconds;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
