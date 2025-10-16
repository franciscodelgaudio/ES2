package com.es2.equipe4.repository;

import com.es2.equipe4.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 

import java.util.List; 

public interface EventRepository extends JpaRepository<Event, Integer> {

    @Query("SELECT DISTINCT e FROM Event e LEFT JOIN FETCH e.lectures")
    List<Event> findAllWithLectures();
}