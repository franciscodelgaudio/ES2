package com.es2.equipe4.dto;

public record CreateParticipantDTO(
        String email,
        String name,
        String password,
        String address,
        String phoneParticipant,
        String roleParticipant
) {}