package com.musicstream.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.musicstream.dto.AuthResponseDTO;
import com.musicstream.dto.LoginDTO;
import com.musicstream.dto.RegistroDTO;
import com.musicstream.model.postgres.User;
import com.musicstream.repository.postgres.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    // BCrypt sem Spring Security — instanciado direto no service
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthResponseDTO registrar(RegistroDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(encoder.encode(dto.getSenha())); // nunca salva senha em texto puro
        userRepository.save(user);

        return new AuthResponseDTO(user.getId(), user.getNome(), user.getEmail());
    }

    public AuthResponseDTO login(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Email ou senha inválidos"));

        if (!encoder.matches(dto.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return new AuthResponseDTO(user.getId(), user.getNome(), user.getEmail());
    }
}