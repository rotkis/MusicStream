package com.musicstream.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musicstream.dto.AuthResponseDTO;
import com.musicstream.dto.LoginDTO;
import com.musicstream.dto.RegistroDTO;
import com.musicstream.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    // POST /api/auth/registro
    // Body: { "nome": "João", "email": "joao@email.com", "senha": "123456" }
    // Retorna: { "id": "uuid...", "nome": "João", "email": "joao@email.com" }
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegistroDTO dto) {
        try {
            AuthResponseDTO response = authService.registrar(dto);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST /api/auth/login
    // Body: { "email": "joao@email.com", "senha": "123456" }
    // Retorna: { "id": "uuid...", "nome": "João", "email": "joao@email.com" }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
        try {
            AuthResponseDTO response = authService.login(dto);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}