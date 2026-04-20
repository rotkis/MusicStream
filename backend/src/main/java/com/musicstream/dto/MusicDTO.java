package com.musicstream.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MusicDTO {

    @NotBlank(message = "Título é obrigatório")
    private String title;

    @NotBlank(message = "Artista é obrigatório")
    private String artist;

    private String album;

    private String genre;

    @Min(value = 1, message = "Duração deve ser maior que zero")
    private Integer durationSeconds;
}