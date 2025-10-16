package com.es2.equipe4.repository;

import com.es2.equipe4.model.EventManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventManagerRepository extends JpaRepository<EventManager, Integer> {
   
    boolean existsByEmail(String email);
}