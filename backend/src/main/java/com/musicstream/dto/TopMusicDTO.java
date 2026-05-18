package com.musicstream.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopMusicDTO {
    private String id;
    private String title;
    private String artist;
    private String album;
    private String genre;
    private Integer durationSeconds;
    private Long playCount;
}
