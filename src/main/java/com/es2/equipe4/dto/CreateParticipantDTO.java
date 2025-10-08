package com.es2.equipe4.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateParticipantDTO(
        String email,
        String name,
        String password,
        String address,
        String phoneParticipant,
        String roleParticipant
) {}
