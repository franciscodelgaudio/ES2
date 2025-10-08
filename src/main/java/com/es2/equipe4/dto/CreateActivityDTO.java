package com.es2.equipe4.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateActivityDTO(
        String name,
        String address,
        Integer quantityVacancies,
        LocalDate startDate,
        LocalDate endDate,
        Integer eventId,
        BigDecimal activityPrice
) {}

