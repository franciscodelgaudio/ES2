package com.es2.equipe4.repository;

import com.es2.equipe4.model.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, Integer> {
    boolean existsByEmail(String email);
}

