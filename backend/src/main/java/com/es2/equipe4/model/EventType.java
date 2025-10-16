package com.es2.equipe4.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_type")
public class EventType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_type_id")
    private Integer eventTypeId;

    
    @Column(name = "name", nullable = false, length = 100)
    private String nameEventType;

    public Integer getEventTypeId() {
        return eventTypeId;
    }

    public void setEventTypeId(Integer eventTypeId) {
        this.eventTypeId = eventTypeId;
    }

    public String getNameEventType() {
        return nameEventType;
    }

    public void setNameEventType(String nameEventType) {
        this.nameEventType = nameEventType;
    }
}