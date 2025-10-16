package com.es2.equipe4.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateLectureDTO(
        String nameEventLecture, 
        String address,
        Integer quantityVacancies,
        LocalDate startDate,
        LocalDate endDate,
        LocalTime startTime,
        LocalTime endTime,
        String description,
        String speaker,
        Integer eventManagerId 
) {}