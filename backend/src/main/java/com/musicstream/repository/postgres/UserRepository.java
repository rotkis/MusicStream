package com.musicstream.repository.postgres;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.musicstream.model.postgres.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}