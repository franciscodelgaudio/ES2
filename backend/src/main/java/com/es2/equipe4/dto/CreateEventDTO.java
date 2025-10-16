package com.es2.equipe4.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List; 

public record CreateEventDTO(
        String nameEvent,
        String address,
        LocalDate startDate,
        LocalDate endDate,
        LocalTime startTime,   
        LocalTime endTime,     
        String description,    
        Integer eventTypeId,
        Integer eventManagerId, 
        List<CreateLectureDTO> lectures
) {}