package com.es2.equipe4.service;

import com.es2.equipe4.dto.CreateEventDTO;
import com.es2.equipe4.dto.CreateParticipantDTO;
import com.es2.equipe4.model.*;
import com.es2.equipe4.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventTypeRepository eventTypeRepository;
    private final EventLectureRepository lectureRepository; 
    private final EventManagerRepository eventManagerRepository; 
    private final EventParticipantRepository participantRepository;

    public EventService(EventRepository eventRepository, EventTypeRepository eventTypeRepository,
                        EventLectureRepository lectureRepository, EventManagerRepository eventManagerRepository,
                        EventParticipantRepository participantRepository) {
        this.eventRepository = eventRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.lectureRepository = lectureRepository;
        this.eventManagerRepository = eventManagerRepository;
        this.participantRepository = participantRepository;
    }

    @Transactional
    public Event createEvent(CreateEventDTO dto) {
        EventType eventType = eventTypeRepository.findById(dto.eventTypeId())
                .orElseThrow(() -> new EntityNotFoundException("EventType not found with id: " + dto.eventTypeId()));

        EventManager eventManager = eventManagerRepository.findById(dto.eventManagerId())
                .orElseThrow(() -> new EntityNotFoundException("EventManager not found with id: " + dto.eventManagerId()));

        Event event = new Event();
        event.setNameEvent(dto.nameEvent());
        event.setAddress(dto.address());
        event.setStartDate(dto.startDate());
        event.setEndDate(dto.endDate());
        event.setStartTime(dto.startTime());
        event.setEndTime(dto.endTime());
        event.setDescription(dto.description());
        event.setEventType(eventType);
        event.setEventManager(eventManager);

        if (dto.lectures() != null && !dto.lectures().isEmpty()) {
            List<EventLecture> lectures = dto.lectures().stream().map(lectureDTO -> {
                EventLecture lecture = new EventLecture();
                lecture.setNameEventLecture(lectureDTO.name());
                lecture.setAddress(lectureDTO.address());
                lecture.setQuantityVacancies(lectureDTO.quantityVacancies());
                lecture.setStartDate(lectureDTO.startDate());
                lecture.setEndDate(lectureDTO.endDate());
                lecture.setStartTime(lectureDTO.startTime());
                lecture.setEndTime(lectureDTO.endTime());
                lecture.setDescription(lectureDTO.description());
                lecture.setSpeaker(lectureDTO.speaker());
                lecture.setEvent(event); 
                lecture.setEventManager(eventManager); 
                return lecture;
            }).collect(Collectors.toList());
            event.setLectures(lectures);
        }

        return eventRepository.save(event);
    }

    @Transactional
    public EventParticipant registerParticipant(CreateParticipantDTO dto) {
        if (participantRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        EventParticipant participant = new EventParticipant();
        participant.setName(dto.name());
        participant.setEmail(dto.email());
        participant.setPassword(dto.password());
        participant.setAddress(dto.address());
        participant.setPhoneParticipant(dto.phoneParticipant());
        participant.setRoleParticipant(dto.roleParticipant());
        return participantRepository.save(participant);
    }

    @Transactional
    public void addParticipantToLecture(Integer lectureId, Integer participantId) {
        EventLecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new EntityNotFoundException("Lecture not found with id: " + lectureId));

        EventParticipant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new EntityNotFoundException("Participant not found with id: " + participantId));
        
        if (lecture.getQuantityVacancies() != null && lecture.getParticipants().size() >= lecture.getQuantityVacancies()) {
            throw new IllegalStateException("Sem vagas para esta palestra");
        }

        lecture.getParticipants().add(participant);
        lectureRepository.save(lecture);
    }

    @Transactional
    public void removeParticipantFromLecture(Integer lectureId, Integer participantId) {
        EventLecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new EntityNotFoundException("Lecture not found with id: " + lectureId));

        EventParticipant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new EntityNotFoundException("Participant not found with id: " + participantId));

        lecture.getParticipants().remove(participant);
        lectureRepository.save(lecture);
    }
}