package com.es2.equipe4.controller;

import com.es2.equipe4.dto.CreateEventDTO;
import com.es2.equipe4.dto.CreateParticipantDTO;
import com.es2.equipe4.model.Event;
import com.es2.equipe4.model.EventLecture;
import com.es2.equipe4.model.EventParticipant;
import com.es2.equipe4.model.EventType;
import com.es2.equipe4.repository.EventLectureRepository;
import com.es2.equipe4.repository.EventParticipantRepository;
import com.es2.equipe4.repository.EventRepository;
import com.es2.equipe4.repository.EventTypeRepository;
import com.es2.equipe4.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EventController {

    private final EventService service;
    private final EventRepository eventRepo;
    private final EventTypeRepository typeRepo;
    private final EventLectureRepository lectureRepo;
    private final EventParticipantRepository participantRepo;

    public EventController(EventService service, EventRepository eventRepo,
                           EventTypeRepository typeRepo, EventLectureRepository lectureRepo,
                           EventParticipantRepository participantRepo) {
        this.service = service;
        this.eventRepo = eventRepo;
        this.typeRepo = typeRepo;
        this.lectureRepo = lectureRepo;
        this.participantRepo = participantRepo;
    }


    @GetMapping("/event-types")
    public List<EventType> listTypes() {
        return typeRepo.findAll();
    }


    @PostMapping("/event-types")
    public EventType createType(@RequestBody EventType t) {
        return typeRepo.save(t);
    }


    @GetMapping("/events")
    public List<Event> listEvents() {
        return eventRepo.findAllWithLectures();
    }

    @PostMapping("/events")
    public Event createEvent(@RequestBody CreateEventDTO dto) {
        return service.createEvent(dto);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Integer id) {
        
        return eventRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lectures")
    public List<EventLecture> listLectures() {
        return lectureRepo.findAll();
    }


    @PostMapping("/lectures/{lectureId}/participants/{participantId}")
    public ResponseEntity<Void> enrollInLecture(@PathVariable Integer lectureId, @PathVariable Integer participantId) {
        service.addParticipantToLecture(lectureId, participantId);
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/lectures/{lectureId}/participants/{participantId}")
    public ResponseEntity<Void> unenrollFromLecture(@PathVariable Integer lectureId, @PathVariable Integer participantId) {
        service.removeParticipantFromLecture(lectureId, participantId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/participants")
    public List<EventParticipant> listParticipants() {
        return participantRepo.findAll();
    }


    @PostMapping("/participants")
    public EventParticipant register(@RequestBody CreateParticipantDTO dto) {
        return service.registerParticipant(dto);
    }
}