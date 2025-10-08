package com.es2.equipe4.service;

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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {
    private final EventRepository eventRepo;
    private final EventTypeRepository typeRepo;
    private final EventActivityRepository activityRepo;
    private final EventParticipantRepository participantRepo;

    public EventService(EventRepository eventRepo, EventTypeRepository typeRepo,
                        EventActivityRepository activityRepo, EventParticipantRepository participantRepo) {
        this.eventRepo = eventRepo;
        this.typeRepo = typeRepo;
        this.activityRepo = activityRepo;
        this.participantRepo = participantRepo;
    }

    @Transactional
    public Event createEvent(CreateEventDTO dto) {
        EventType type = typeRepo.findById(dto.eventTypeId())
                .orElseThrow(() -> new IllegalArgumentException("event_type_id inválido"));

        Event e = new Event();
        e.setNameEvent(dto.nameEvent());
        e.setAddress(dto.address());
        e.setStartDate(dto.startDate());
        e.setEndDate(dto.endDate());
        e.setEventType(type);
        e.setEventPrice(dto.eventPrice());
        return eventRepo.save(e);
    }

    @Transactional
    public EventActivity createActivity(CreateActivityDTO dto) {
        Event ev = eventRepo.findById(dto.eventId())
                .orElseThrow(() -> new IllegalArgumentException("event_id inválido"));

        EventActivity a = new EventActivity();
        a.setName(dto.name());
        a.setAddress(dto.address());
        a.setQuantityVacancies(dto.quantityVacancies());
        a.setStartDate(dto.startDate());
        a.setEndDate(dto.endDate());
        a.setEvent(ev);
        a.setActivityPrice(dto.activityPrice());
        return activityRepo.save(a);
    }

    @Transactional
    public EventParticipant registerParticipant(CreateParticipantDTO dto) {
        if (participantRepo.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        EventParticipant p = new EventParticipant();
        p.setEmail(dto.email());
        p.setName(dto.name());
        p.setPassword(dto.password());
        p.setAddress(dto.address());
        p.setPhoneParticipant(dto.phoneParticipant());
        p.setRoleParticipant(dto.roleParticipant());
        return participantRepo.save(p);
    }

    @Transactional
    public void addParticipantToEvent(Integer eventId, Integer participantId) {
        Event ev = eventRepo.findById(eventId).orElseThrow();
        EventParticipant p = participantRepo.findById(participantId).orElseThrow();
        ev.getParticipants().add(p);
        eventRepo.save(ev);
    }

    @Transactional
    public void addParticipantToActivity(Integer activityId, Integer participantId) {
        EventActivity ac = activityRepo.findById(activityId).orElseThrow();
        EventParticipant p = participantRepo.findById(participantId).orElseThrow();

        // valida vagas, se quiser:
        if (ac.getQuantityVacancies() != null && ac.getParticipants().size() >= ac.getQuantityVacancies()) {
            throw new IllegalStateException("Sem vagas para esta atividade");
        }

        ac.getParticipants().add(p);
        activityRepo.save(ac);
    }
}

