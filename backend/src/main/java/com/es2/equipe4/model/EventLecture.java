package com.es2.equipe4.model;

import com.fasterxml.jackson.annotation.JsonBackReference; 
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event_lecture")
public class EventLecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_lecture_id")
    private Integer eventLectureId;

    @Column(name = "name_event_lecture", nullable = false, length = 100)
    private String nameEventLecture;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "quantity_vacancies")
    private Integer quantityVacancies;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "speaker", length = 100)
    private String speaker;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    @JsonBackReference 
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_manager_id")
    @JsonBackReference("manager-lectures") 
    private EventManager eventManager;

    @ManyToMany
    @JoinTable(
            name = "event_lecture_event_participant",
            joinColumns = @JoinColumn(name = "event_lecture_id"),
            inverseJoinColumns = @JoinColumn(name = "event_participant_id")
    )
    private Set<EventParticipant> participants = new HashSet<>();

    // --- GETTERS E SETTERS ---

    public Integer getEventLectureId() {
        return eventLectureId;
    }

    public void setEventLectureId(Integer eventLectureId) {
        this.eventLectureId = eventLectureId;
    }

    public String getNameEventLecture() {
        return nameEventLecture;
    }

    public void setNameEventLecture(String nameEventLecture) {
        this.nameEventLecture = nameEventLecture;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getQuantityVacancies() {
        return quantityVacancies;
    }

    public void setQuantityVacancies(Integer quantityVacancies) {
        this.quantityVacancies = quantityVacancies;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpeaker() {
        return speaker;
    }

    public void setSpeaker(String speaker) {
        this.speaker = speaker;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public EventManager getEventManager() {
        return eventManager;
    }

    public void setEventManager(EventManager eventManager) {
        this.eventManager = eventManager;
    }

    public Set<EventParticipant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<EventParticipant> participants) {
        this.participants = participants;
    }
}