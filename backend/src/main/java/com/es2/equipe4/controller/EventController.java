package com.es2.equipe4.controller;

import com.es2.equipe4.dto.CreateActivityDTO;
import com.es2.equipe4.dto.CreateEventDTO;
import com.es2.equipe4.dto.CreateParticipantDTO;
import com.es2.equipe4.model.Event;
import com.es2.equipe4.model.EventActivity;
import com.es2.equipe4.model.EventParticipant;
import com.es2.equipe4.model.EventType;
import com.es2.equipe4.repository.EventActivityRepository;
import com.es2.equipe4.repository.EventParticipantRepository;
import com.es2.equipe4.repository.EventRepository;
import com.es2.equipe4.repository.EventTypeRepository;
import com.es2.equipe4.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EventController {

    private final EventService service;
    private final EventRepository eventRepo;
    private final EventTypeRepository typeRepo;
    private final EventActivityRepository activityRepo;
    private final EventParticipantRepository participantRepo;

    public EventController(EventService service, EventRepository eventRepo,
                           EventTypeRepository typeRepo, EventActivityRepository activityRepo,
                           EventParticipantRepository participantRepo) {
        this.service = service;
        this.eventRepo = eventRepo;
        this.typeRepo = typeRepo;
        this.activityRepo = activityRepo;
        this.participantRepo = participantRepo;
    }

    // Tipos de evento
    @GetMapping("/event-types")
    public List<EventType> listTypes() { return typeRepo.findAll(); }

    @PostMapping("/event-types")
    public EventType createType(@RequestBody EventType t) { return typeRepo.save(t); }

    // Eventos
    @GetMapping("/events")
    public List<Event> listEvents() { return eventRepo.findAll(); }

    @PostMapping("/events")
    public Event createEvent(@RequestBody CreateEventDTO dto) { return service.createEvent(dto); }

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Integer id) {
        return eventRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/events/{eventId}/participants/{participantId}")
    public ResponseEntity<Void> enrollInEvent(@PathVariable Integer eventId, @PathVariable Integer participantId) {
        service.addParticipantToEvent(eventId, participantId);
        return ResponseEntity.noContent().build();
    }

    // Atividades
    @GetMapping("/activities")
    public List<EventActivity> listActivities() { return activityRepo.findAll(); }

    @PostMapping("/activities")
    public EventActivity createActivity(@RequestBody CreateActivityDTO dto) { return service.createActivity(dto); }

    @PostMapping("/activities/{activityId}/participants/{participantId}")
    public ResponseEntity<Void> enrollInActivity(@PathVariable Integer activityId, @PathVariable Integer participantId) {
        service.addParticipantToActivity(activityId, participantId);
        return ResponseEntity.noContent().build();
    }

    // Participantes
    @GetMapping("/participants")
    public List<EventParticipant> listParticipants() { return participantRepo.findAll(); }

    @PostMapping("/participants")
    public EventParticipant register(@RequestBody CreateParticipantDTO dto) { return service.registerParticipant(dto); }
}
