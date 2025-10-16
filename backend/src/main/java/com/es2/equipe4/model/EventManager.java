package com.es2.equipe4.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; 
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event_manager")
public class EventManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_manager_id")
    private Integer eventManagerId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    // --- CORREÇÃO AQUI ---
    @OneToMany(
            mappedBy = "eventManager",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference("manager-events") 
    private List<Event> events = new ArrayList<>();

    @OneToMany(
            mappedBy = "eventManager",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference("manager-lectures") 
    private List<EventLecture> lectures = new ArrayList<>();

    // --- GETTERS E SETTERS ---

    public Integer getEventManagerId() {
        return eventManagerId;
    }

    public void setEventManagerId(Integer eventManagerId) {
        this.eventManagerId = eventManagerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<EventLecture> getLectures() {
        return lectures;
    }

    public void setLectures(List<EventLecture> lectures) {
        this.lectures = lectures;
    }
}