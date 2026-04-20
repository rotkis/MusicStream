package com.musicstream.seeder;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.musicstream.model.postgres.Music;
import com.musicstream.repository.postgres.MusicRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// ATUALIZADO: import net.datafaker.Faker — não mais com.github.javafaker.Faker
// JavaFaker foi abandonado e é incompatível com Java 21+.
// Datafaker é o substituto oficial, com API praticamente idêntica.
import net.datafaker.Faker;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final MusicRepository musicRepository;

    private static final String[] GENRES =
            {"Rock", "Pop", "MPB", "Samba", "Jazz", "Eletrônico", "Hip-Hop", "Forró", "Reggae"};

    @Override
    public void run(ApplicationArguments args) {
        if (musicRepository.count() > 0) {
            log.info("Banco já populado — seeder ignorado.");
            return;
        }

        // Datafaker: construtor identico ao JavaFaker
        Faker faker = new Faker(new Locale("pt-BR"));

        List<Music> musics = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Music music = new Music();

            // Título: 3 palavras aleatórias (Datafaker usa faker.lorem().words())
            List<String> words = faker.lorem().words(3);
            music.setTitle(String.join(" ", words));

            // Artista: nome completo
            music.setArtist(faker.name().fullName());

            // Álbum: título de livro (boa fonte de nomes criativos)
            music.setAlbum(faker.book().title());

            // Gênero: escolha aleatória do array fixo
            int genreIndex = faker.number().numberBetween(0, GENRES.length);
            music.setGenre(GENRES[genreIndex]);

            // Duração: entre 1m30s e 6m (em segundos)
            music.setDurationSeconds(faker.number().numberBetween(90, 360));

            musics.add(music);
        }

        musicRepository.saveAll(musics);
        log.info("100 músicas geradas com Datafaker.");
    }
}
