package com.es2.equipe4.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event_activity")
public class EventActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_activity_id")
    private Integer eventActivityId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "quantity_vacancies")
    private Integer quantityVacancies;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "activity_price", precision = 10, scale = 2)
    private BigDecimal activityPrice;

    @ManyToMany
    @JoinTable(
            name = "event_activity_event_participant",
            joinColumns = @JoinColumn(name = "event_activity_id"),
            inverseJoinColumns = @JoinColumn(name = "event_participant_id")
    )
    private Set<EventParticipant> participants = new HashSet<>();

    // Getters e Setters corretos

    public Integer getEventActivityId() {
        return eventActivityId;
    }

    public void setEventActivityId(Integer eventActivityId) {
        this.eventActivityId = eventActivityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public BigDecimal getActivityPrice() {
        return activityPrice;
    }

    public void setActivityPrice(BigDecimal activityPrice) {
        this.activityPrice = activityPrice;
    }

    public Set<EventParticipant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<EventParticipant> participants) {
        this.participants = participants;
    }
}
