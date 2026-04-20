package com.musicstream.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.musicstream.model.cassandra.MusicPlay;
import com.musicstream.model.postgres.Music;
import com.musicstream.repository.cassandra.MusicPlayRepository;
import com.musicstream.repository.postgres.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicPlayService {

    private final MusicPlayRepository playRepository;
    private final MusicRepository musicRepository;

    // Registra uma reprodução — cada chamada cria uma nova linha no Cassandra
    public void registerPlay(String musicId, String userId) {
        MusicPlay play = new MusicPlay();
        play.setMusicId(musicId);
        play.setPlayId(UUID.randomUUID()); // UUID garante unicidade como clustering key
        play.setUserId(userId);
        play.setPlayedAt(LocalDateTime.now());
        // REMOVIDO: setPlayCount — não existe mais no modelo corrigido
        playRepository.save(play);
    }

    // Top N mais ouvidas — conta linhas por musicId e ordena
    public List<Music> getTopMusics(int limit) {
        Map<String, Long> playCount = playRepository.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                MusicPlay::getMusicId, Collectors.counting()
            ));

        return playCount.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(limit)
            .map(e -> musicRepository.findById(e.getKey()).orElse(null))
            .filter(Objects::nonNull)
            .toList();
    }

    // Shuffle ponderado — músicas mais ouvidas têm mais "fichas" no sorteio
    public List<Music> getWeightedShuffle(List<String> musicIds) {
        Map<String, Long> playCount = new HashMap<>();

        for (String id : musicIds) {
            // CORRIGIDO: usa findByMusicId (método válido no Cassandra)
            long count = playRepository.findByMusicId(id).size();
            playCount.put(id, count + 1); // +1 garante que músicas sem plays também entram
        }

        // Cria lista ponderada: música com 5 plays ganha 6 fichas, com 0 plays ganha 1
        List<String> weightedList = new ArrayList<>();
        playCount.forEach((id, count) -> {
            for (int i = 0; i < count; i++) weightedList.add(id);
        });

        Collections.shuffle(weightedList);

        // Remove duplicatas mantendo a ordem embaralhada
        return weightedList.stream()
            .distinct()
            .map(id -> musicRepository.findById(id).orElse(null))
            .filter(Objects::nonNull)
            .toList();
    }
}