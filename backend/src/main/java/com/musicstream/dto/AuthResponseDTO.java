package com.musicstream.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// ── Response para login e registro ──────────────────────────────────────────
// O frontend salva { id, nome, email } no AuthContext/localStorage
@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String id;
    private String nome;
    private String email;
}