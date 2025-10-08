package com.es2.equipe4.repository;

import com.es2.equipe4.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {}

