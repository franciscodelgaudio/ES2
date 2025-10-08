package com.es2.equipe4.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_participant")
public class EventParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_participant_id")
    private Integer eventParticipantId;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "phone_participant", length = 30)
    private String phoneParticipant;

    @Column(name = "role_participant", length = 30)
    private String roleParticipant;

    @Column(name = "email_verified")
    private Boolean emailVerified = Boolean.FALSE;

    // ===== Getters e Setters =====

    public Integer getEventParticipantId() {
        return eventParticipantId;
    }

    public void setEventParticipantId(Integer eventParticipantId) {
        this.eventParticipantId = eventParticipantId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneParticipant() {
        return phoneParticipant;
    }

    public void setPhoneParticipant(String phoneParticipant) {
        this.phoneParticipant = phoneParticipant;
    }

    public String getRoleParticipant() {
        return roleParticipant;
    }

    public void setRoleParticipant(String roleParticipant) {
        this.roleParticipant = roleParticipant;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
}
