package com.es2.equipe4.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateEventDTO(
        String nameEvent,
        String address,
        LocalDate startDate,
        LocalDate endDate,
        Integer eventTypeId,
        BigDecimal eventPrice
) {}

